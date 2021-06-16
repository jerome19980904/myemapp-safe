import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert, Picker
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import SelectionedMultiSelect from "react-native-sectioned-multi-select";
import Modal from "react-native-modal";
import { connect } from "react-redux";

import LongButton from "_Components/LongButton";
import * as fb from "_root/firebase.js";
import * as types from "_Store/Actions/ActionsTypes";
import * as syst from "_root/systemFunctions.js"
import * as notif from "_root/Notifications"

const mapStateToProps = function (state) {
  return state;
};



class Profil extends Component {
  state = {
    image: null,
    selectedAsso : "",
    selectingAsso:false,
    modalVisible:false
  };
  constructor(props) {
    super(props);
  }

  _resetPassword(email) {
    fb.auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Email envoyé",
          "Un email de réinitialisation de mot de passe vous a été envoyé.",
          [
            {
              text: "OK",
            },
          ]
        );
      });
  }

  _toggleUserPhoto(photo) {
    const action = {
      type: types.TOGGLE_USER_PHOTO,
      value: photo,
    };
    this.props.dispatch(action);
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        this._toggleUserPhoto(result.uri);
      }

      console.log("**********RESULT************");
      console.log(result);
      console.log(this.props.user.userPhoto);
    } catch (E) {
      console.log(E);
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert(
          "Nous avons besoin d'accéder à caméra pour prendre la photo de profil."
        );
      }
    }
  };

  onSelectedAssoChange = selectedAsso => {
    this.setState({selectedAsso: selectedAsso[0]});
  };

  _demanderUneAsso = async ()=> {
    var user = this.props.user
    console.log("userId" +  user.userID)
    var alreadyAsked = await fb.verifierDemandeAsso(user.userID)
    console.log("Déja demandé : " + alreadyAsked)
    if (alreadyAsked){
      Alert.alert("Déjà fait!", "Vous avez déjà demandé une asso!",[{
        text: "Compris !",
        onPress: () => this.setState({modalVisible:false})
      }
    ] )
    } else {
      console.log("Aucune demande en cours")
      Alert.alert("Demande faite!", "L'association devra vérifier votre demande",[{
        text: "J'attends !",
        onPress: () => this.setState({modalVisible:false})
      }
    ] )
      var asking= {assoAsked:this.state.selectedAsso, userID : user.userID, firstName : user.firstName, lastName:user.lastName, date: new Date()}
      await fb.addDataInDatabase("assosAsking", asking)
      await notif.sendPushNotification(await fb.getToken(false, ["modo", this.state.selectedAsso], false), 'default', 'Nouvelle Demande Asso', "Quelqu'un a demandé à être ajouté à votre asso! Vérifiez la demande dans votre espace administrateur!", "Nouvelle Demande d'Asso", "Un utilisateur a demandé à rejoindre une asso, vous pouvez l'accepter ou le refuser dans le panneau admin!")
    }
  }

_assoPicker = ()=>{
    var pickerItems = []
    var list = this.props.assos.assoList
      list.forEach((item)=> pickerItems.push(<Picker.Item label={item.name} value={item.name}/>))
      return pickerItems
  }

  render() {

    console.log("****************** PROFIL ******************");
    console.log(this.props.user.mail);
    var askingButton = (<Text style={styles.infos}>{this.props.user.asso}</Text>)
    if (this.props.user.asso==="None"){
      askingButton = (                <LongButton
                        style={styles.button}
                        onPress={() =>
                          {Alert.alert("Attention!!", "Veuillez ne revendiquer votre asso que si vous en faites partie. Pour les 1A, ne demandez pas une asso dans laquelle vous voulez aller car l'association sera au courant et ça peut jouer contre vous.", [
        {
          text: "Compris",
          onPress: () => this.setState({modalVisible:true})
        }
      ])
                        }}
                        title="Revendiquer une asso"
                      />)
    }

    return (
      <View style={styles.mainContainer}>
      <Modal
        animationType="slide"
        isVisible={this.state.modalVisible}
      >
      <View style={styles.modalContainer}>
      <Text style={styles.title}>Choisissez votre asso :</Text>
      <View style={{flex:4}}>
      <Picker
        selectedValue={this.state.selectedAsso}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState({selectedAsso:itemValue})}
      >
{this._assoPicker()}
</Picker>
</View>
<View style={{flexDirection:"row", flex:1.2}}>
<LongButton
                 style={styles.button2}
                 onPress={() =>
                   this.setState({modalVisible:false, selectedAsso:""})
                 }
                 title="Annuler"
               />
               <LongButton
                                style={styles.button2}
                                onPress={() =>
                                  this._demanderUneAsso()
                                }
                                title="Revendiquer"
                              />
</View>
</View>
      </Modal>
          <View style={styles.upScreen}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => this._pickImage()}
          >
            <Image
              source={{ uri: this.props.user.userPhoto }}
              style={styles.circle}
            />
          </TouchableOpacity>
          </View>

        <View style={styles.nameView}>
          <Text style={styles.name}>
            {this.props.user.lastName} {this.props.user.firstName}
          </Text>
        </View>
        <View style={styles.middleScreen}>
          <Text style={styles.title}>Mail</Text>

          <Text style={styles.infos}>{this.props.user.mail}</Text>
          <Text style={styles.title}>Mot de Passe</Text>
          <LongButton
                           style={styles.button}
                           onPress={() =>
                             this._resetPassword(this.props.user.mail)
                           }
                           title="Réinitialiser"
                         />

          <Text style={styles.title}>Association</Text>
          {askingButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "white",
    flex:0.6,
    margin:20,
    padding:10,
    borderRadius: 10
  },
  circle: {
    position: "absolute",
    width: syst.viewportWidth/3,
    height: syst.viewportWidth/3,
    borderRadius: 100,
    backgroundColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameView: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    alignContent: "space-between",
    marginTop: 15,
    marginBottom:10,
    fontSize: 18,
  },
  upScreen: {
    flex: 2,
    alignSelf: "stretch",
    backgroundColor: "gray",
    justifyContent:"center",
    alignItems:"center",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  middleScreen: {
    flex: 5,
    marginTop: 25,
    alignItems: "center",
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 23,
  },
  infos: {
    alignContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
    color: "gray",
    fontSize: 14,
  },
  button: {
    marginBottom: 10
  },
  button2:{
    width : 120,
    marginHorizontal:10
  }
});

export default connect(mapStateToProps)(Profil);
