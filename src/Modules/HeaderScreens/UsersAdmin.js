import React, {Component} from "react";
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput} from "react-native";
import Dialog from "react-native-dialog";
import MultiSelect from 'react-native-multiple-select';

import LoadingComponent from "_Components/LoadingComponent";
import CollapsibleComponent from "_Components/CollapsibleComponent";
import LongButton from "_Components/LongButton"
import InputField from "_Components/InputField"
import FilterComponent from "_Components/FilterComponent"
import * as syst from "_root/systemFunctions"
import * as fb from "_root/firebase";


const filtreCategories = [{objet: "Aucun Filtre", display : "Aucun Filtre"}, {objet : "firstName",display : "Prénom"}, {objet : "lastName",display : "Nom"}, {objet : "accountType", display : "Type de Compte"}, {objet : "mail",display :"Adresse Mail"}, {objet : "checked", display : "Compte Vérifié"}, {objet : "asso",display : "Association"}, {objet : "userID", display :"ID de l'utilisateur"}]
class UsersAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilisateursFiltered:[],
      loading: false,
      update: true,
      dialogVisible:false,
      dialogType:"",
      dialogValue:"",
      dialogID : "",
    };
  }

  _inputChanged(value) {
        this.setState({
          dialogValue: value
        });
  }

  async _showDialogInput(value,  id, type) {
    if(type==="suppression") {
      Alert.alert("Attention!!!", "Vous êtes sur le point de supprimer un compte. Est-ce bien cela que vous voulez?", [
        {
          text: "Oui",
          onPress: async () => {      this.setState({loading:true})
          await fb.supprimerDoc("usersData", id)
          this.setState({loading:false})}
        },
        {
          text: "Annuler",
          onPress: () => console.log("Suppression Annulée"),
          style: "cancel"
        }
      ],
      {cancelable: false})
      this.setState({loading:false})
    } else{
      this.setState({
        dialogVisible: true,
        dialogValue: value,
        dialogType: type,
        dialogID:id
      });}
  }

  _handleCancel = () => {
    this.setState({dialogVisible: false, dialogID:"", dialogType:"", dialogValue:""});
  };

  _handleValidate = async () => {
    console.log("******************************* HANDLE VALIDATE *************************************************")
    if (
      this.state.dialogType === "compte" &&
      !Number(this.state.dialogValue) &&
      Number(this.state.dialogValue) != 0
    ) {
      Alert.alert("Mauvais", "Il faut mettre un nombre gros")
    }  else {
      this.setState({dialogVisible:false})
      if (this.state.dialogType==="nom"){
        await fb.writeInDatabase("usersData", this.state.dialogID, {
          lastName: this.state.dialogValue
        }, true)
        this.setState({dialogVisible:false, dialogType:"", dialogValue:"", dialogID:""})
      }
      if (this.state.dialogType==="prénom"){
        await fb.writeInDatabase("usersData",this.state.dialogID,{
          firstName: this.state.dialogValue
        }, true)
      }
      if (this.state.dialogType==="compte"){
        await fb.writeInDatabase("usersData", this.state.dialogID, {
          accountType: Number(this.state.dialogValue)
        }, true)
      }
      if (this.state.dialogType==="asso"){
        await fb.writeInDatabase("usersData", this.state.dialogID, {
          asso: this.state.dialogValue
        }, true)
      }
      this.setState({loading:false, update:true})
    }
    }

_returnCollapsibleComponent(item){
  var date = syst.convertToFrenchDate(item.signUpDate, "monthLetter", true)
  return (
    <View style={styles.main}>
      <View style={{flexDirection: "row"}}>
        <View style={{flex:2,justifyContent:"center"}}>
          <Text style={{ fontWeight: "bold", fontSize: 16}}>
            {item.firstName + " " + item.lastName}
          </Text>
        </View>
        <View style={{flex:1, justifyContent:"center", alignItems:"flex-end"}}>
          <Text style={{fontSize: 12}}>
            {"Type : " + item.accountType}
          </Text>
        </View>
      </View>
      <Text style={{fontSize: 12}}>{"Mail : " + item.mail}</Text>
      <Text style={{fontSize: 12}}>{"Asso : " + item.asso}</Text>
      <Text style={{fontSize: 12}}>{"ID : " + item.userID}</Text>
      <Text style={{fontSize: 12}}>{"Notif Token : " + item.notif}</Text>
      <Text style={{fontSize: 12}}>
        {"Inscription le : " + date}
      </Text>
    </View>
  );
}

_getUsers = async () => {
  console.log("début");
  var users = [];
  var usersNone = await fb.getData("usersData");
  usersNone.forEach(user => {
    var userData = user.data();
    users.push({
      userID: userData.userID,
      firstName: userData.firstName,
      lastName: userData.lastName,
      mail: userData.mail,
      asso: userData.asso,
      accountType: userData.accountType,
      signUpDate: userData.signUpDate,
      cguAccepted: userData.cguAccepted,
      checked: userData.checked,
      notif : userData.expoNotificationToken
    });
  });
  this.setState({utilisateurs: users, loading: false, update: false, utilisateursFiltered:users, filtreCat:"", filtreText:""});
  console.log("fin");
};


_filtrerUtilisateurs = (data) => {
  this.setState({utilisateursFiltered:data})
}

  render() {
    if (!this.state.loading && this.state.update) {
      this.setState({loading: true});
      this._getUsers()
    }

    console.log("****************** USERS ADMIN ******************", this.state);


    if (this.state.loading) {
      return (
        <LoadingComponent
          logoStyle={styles.logo}
          logoVisible={true}
          size={"large"}
          color={"#FF3333"}
        />
      );
    } else {
      return (
        <View style={styles.mainContainer}>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>{"Edition " + this.state.dialogType}</Dialog.Title>
          <Dialog.Description>Entrez la nouvelle valeur</Dialog.Description>
          <Dialog.Input
            value={this.state.dialogValue}
            selectionColor="red"
            style={{
              color: "black"
            }}
            onChangeText={text => this._inputChanged(text)}
          />
          <Dialog.Button label="Valider" onPress={()=>this._handleValidate()} />
          <Dialog.Button label="Annuler" onPress={()=>this._handleCancel()} />
        </Dialog.Container>

        <FilterComponent data={this.state.utilisateurs} filtreCategories={filtreCategories} onceFiltered={this._filtrerUtilisateurs}/>

          <FlatList
            data={this.state.utilisateursFiltered}
            renderItem={({item}) => (
              <CollapsibleComponent
                collapsibleContent={this._returnCollapsibleComponent(item)}
                collapsedContent={<View style={styles.collapsed}>
                <LongButton
                  style={styles.button}
                  onPress={()=>this._showDialogInput(item.lastName,item.userID, "nom")}
                  title="Changer Nom"
                />
                <LongButton
                  style={styles.button}
                  onPress={()=>this._showDialogInput(item.firstName,item.userID, "prénom")}
                  title="Changer Prénom"
                />
                <LongButton
                  style={styles.button}
                  onPress={()=>this._showDialogInput(item.asso,item.userID, "asso")}
                  title="Changer Asso"
                />
                <LongButton
                  style={styles.button}
                  onPress={()=>this._showDialogInput(item.accountType,item.userID, "compte")}
                  title="Changer Type de Compte"
                />
                <LongButton
                  style={styles.button}
                  onPress={()=>this._showDialogInput("",item.userID, "suppression")}
                  title="Supprimer Compte"
                />
              </View>}
                />
            )}
            overScrollMode="always"
            keyExtractor={item => item.userID}
          />
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 30
  },
  main: {
    height: 100,
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "center"
  },
  collapsed :{
      flex: 1,
      margin: 10,
      borderRadius: 4,
      padding: 10,
      justifyContent: "center"
  },
  button: {
      marginBottom: 10
    }
});

export default UsersAdmin;
