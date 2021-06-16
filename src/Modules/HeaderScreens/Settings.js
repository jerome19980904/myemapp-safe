import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  Alert
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import SelectionedMultiSelect from "react-native-sectioned-multi-select";
import Modal from "react-native-modal";
import { connect } from "react-redux";

import LongButton from "_Components/LongButton";
import MenuBar from "_Components/MenuBar";
import textStyles from "_styles/textStyles";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";
import * as notif from "_root/Notifications.js"
import * as fb from "_root/firebase.js";
import * as syst from "_root/systemFunctions.js";


const mapStateToProps = function (state) {
  return state;
};

const notifsListNone = [{id:"Aucune", display:"Aucune Notification"},
  {id:"Toutes", display: "Toutes les Notifications"},
  {id: "User", display: "Notifications Utilisateur"}]



const signOutNav = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })],
});



class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { showEasterEgg: false,
      notifsParam: [],
      modalVisible:false,
      notifsList:notifsListNone,
      loading:false };
  }

  _signOut() {
    console.log("signOut");
    fb.auth.signOut()
      .then(() => console.log("logOut"))
      .catch((error) => console.log(error));
    this.props.navigation.dispatch(signOutNav);
  }

  _imagePressed() {
    this.setState({ showEasterEgg: !this.state.showEasterEgg });
  }

  _retirerAssosIncompletes(list){
    var assosIncompletes = []
    var listGood = list
    list.forEach(item => {
      if (item.split("-")[0]===item && item!="User"){
        if (!list.includes(item + "-Event") || !list.includes(item + "-Article") || !list.includes(item + "-Annonce")){
          listGood.splice(listGood.indexOf(item), 1)
        }
      }
    })
    return listGood
  }

  _mettreAssosCompletes(list){
    var listGood = list
    list.forEach(item => {
      var asso = item.split("-")[0]
      if (asso!=item && !listGood.includes(asso) && list.includes(asso+"-Event") && list.includes(asso+"-Article") && list.includes(asso+"-Annonce") ){
        listGood.push(asso)
      }
    })
    return listGood
  }

  onSelectedItemsChange = selectedItems => {
    if (selectedItems.includes("Aucune")){
      this.setState({notifsParam:[]})
    } else if (selectedItems.includes("Toutes")){
      this.setState({notifsParam:this.state.notifsComplete})
    } else {
    this.setState({notifsParam:this._mettreAssosCompletes(this._retirerAssosIncompletes(selectedItems))})
    }
    console.log(selectedItems)
  }

  _comparerListes(list1, list2){
    var comp = []
    list1.forEach((item)=>{
      if (!list2.includes(item)){
        comp.push(item)
      }
    })
    return comp
  }

  _separerAjouterSupprimer = (listeDepart, listeFin) =>{
    if (listeDepart===undefined){
      listeDepart=[]
    }

    if (listeFin==undefined){
      listeFin=[]
    }

    var ajouter = this._comparerListes(listeFin, listeDepart)
    var supprimer = this._comparerListes(listeDepart, listeFin)

    return [ajouter, supprimer]
  }

  onConfirm = async () => {
    notif.registerForPushNotifications()
    this.setState({modalVisible:false})
    await fb.writeInDatabase("usersData", this.props.user.userID, {notificationsList:this.state.notifsParam}, true)

    var [ajouter, supprimer] = this._separerAjouterSupprimer(this.props.user.notificationsList, this.state.notifsParam)

    console.log("ajouter : ", ajouter, "supprimer",supprimer)
    await fb.supprimerToken(supprimer, this.props.user.expoNotificationToken)
    await fb.ajouterToken(ajouter, this.props.user.expoNotificationToken)

    Alert.alert("Modifications enregistrées", "Vos préférences de notification ont été mises à jour. Vous les verrez sur votre profil lors de votre prochaine connexion. Vous pourrez les modifier une nouvelle fois à partir de ce moment là.")
  }

  toggleModal = () => {
    this.setState({modalVisible:!this.state.modalVisible})
  }

  render() {

    console.log("********************************************************* SETTINGS ***********************************************")
    var administrateurMenu
    if (!this.state.loading && !this.state.notifsList[4]){
      this.setState({loading:true})
      var notifsList = this.state.notifsList
      var assoList = this.props.assos.assoList
      var notifsComplete = ["User"]
      assoList.forEach((asso)=>{
        var asso = asso.name

        notifsComplete.push(asso, asso+"-Article", asso+"-Event", asso+"-Annonce")
        notifsList.push({id: asso, display: asso, children:[{id:asso+"-Article", display:"Nouvel Article dans le M"}, {id:asso+"-Event",display:"Nouvel événement"}, {id:asso+"-Annonce",display:"Annonce faite par l'association"}]})
      })
      var notifsParam = []
      if (this.props.user.notificationsList){
        notifsParam = this.props.user.notificationsList
      }
      this.setState({notifsList:notifsList, loading:false, notifsComplete:notifsComplete, notifsParam:notifsParam})
    }

    if (this.props.user.accountType > 0) {
      administrateurMenu = (
        <MenuBar
          onPress={() => this.props.navigation.navigate("Admin")}
          title="Gestion Administrateur"
        />
      );
    }

    const regularImage = (
      <Image
        style={styles.image}
        resizeMode={"contain"}
        source={require("../../assets/logo2.png")}
      />
    );
    const easterEggImage = (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image
          style={styles.image}
          resizeMode={"contain"}
          source={require("../../assets/icon-rounded.png")}
        />
        <Text style={[textStyles.h2, { color: "black", fontSize: 14 }]}>
          Notre premier logo ressemblait à ça !
        </Text>
      </View>
    );

    return (
      <View style={styles.mainContainer}>

      <Modal
        animationType="slide"
        isVisible={this.state.modalVisible}
        backdropTransitionOutTiming={0}
      >
      <View style={styles.modalContainer}>
      <SelectionedMultiSelect items={this.state.notifsList}
      uniqueKey="id"
      displayKey="display"
      subKey="children"
      selectText="Préférences de Notification..."
      confirmText="Enregistrer les modifications"
      styleDropdownMenu={{width : syst.viewportWidth- 20}}
      onSelectedItemsChange={this.onSelectedItemsChange}
      selectedItems={this.state.notifsParam}
      hideSearch={true}
      showChips={false}
      showRemoveAll={true}
      modalWithSafeAreaView={true}
      selectChildren={true}
      showCancelButton={true}
      parentChipsRemoveChildren={true}
      onConfirm={this.onConfirm}
      onCancel={this.toggleModal}/>
</View>
      </Modal>

        <View style={styles.textArea}>
          <Text style={[textStyles.h3, styles.text]}>
            L'application meEMapp vise à renforcer les relations entre les
            différentes associations de l'école.
          </Text>
        </View>
        <View style={styles.body}>
          <MenuBar
            onPress={() => this.props.navigation.navigate("PolConf")}
            title="Politique de confidentialité"
          />
          <MenuBar
            onPress={() => this.props.navigation.navigate("About")}
            title="À propos de myEMapp"
          />
          <MenuBar
            onPress={() =>
              Linking.openURL(
                "mailto:myemapp-app@gmail.com?subject=Report problèmes"
              )
            }
            title="Un problème / avis ?"
          />

          <MenuBar
            onPress={() => this.props.navigation.navigate("Credits")}
            title="Crédits"
          />
          {administrateurMenu}
          <MenuBar
            onPress={this.toggleModal}
            title="Paramètres de Notification"
          />



        </View>
        <View style={styles.footer}>
          <LongButton title="Déconnexion" onPress={() => this._signOut()} />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Settings)

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  textArea: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  body: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
  },
  text: {
    color: "#919192",
  },

  image: {
    marginTop: 14,
    height: 180,
    marginBottom: 10,
  },
  footer: { marginTop: 30 },
  modalContainer: {
      backgroundColor: "#FFFFFF",
      alignContent:"center",
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginHorizontal: 5,
      marginVertical: 20,
      borderRadius: 10
    }
});
