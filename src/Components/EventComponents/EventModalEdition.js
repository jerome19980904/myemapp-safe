import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import {Icon, Button, Input} from "react-native-elements";
import SelectionedMultiSelect from "react-native-sectioned-multi-select";
import Dialog from "react-native-dialog";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

import CacheImage from "_Components/CacheImage";
import CollapsibleComponent from "_Components/CollapsibleComponent";
import LongButton from "_Components/LongButton";
import LoadingComponent from "_Components/LoadingComponent";
import textStyles from "_root/styles/textStyles";
import * as fb from "_root/firebase";
import * as syst from "_root/systemFunctions";
import * as notif from "_root/Notifications.js"


let placeholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac posuere leo, a cursus est. Vivamus mattis, ante vel sollicitudin tempus, leo ante volutpat purus, quis vulputate ipsum risus bibendum.";
const eventNone = {id : "", name: "", time:0, place:"", asso:[" "], details:"", price:"", fblink:"", sglink:"", img:"", categories:[" "]}
const eventCategories = [{objet:"Sport", display:"Sport" },{objet:"Soirée", display:"Soirée" }, {objet:"Apéro", display:"Apéro" }, {objet:"Son", display:"Son" }, {objet:"Art", display:"Art" }, {objet:"Danse", display:"Danse" }, {objet:"Séjour", display:"Séjour" }, {objet:"Appartement", display:"Appartement" }, {objet:"Jeux", display:"Jeux" }, {objet:"Conférence", display:"Conférence" }, {objet:"Interview", display:"Interview" },{objet:"Sérieux", display:"Sérieux" },{objet:"Cours", display:"Cours" },{objet:"Dégustation", display:"Dégustation" },{objet:"Repas", display:"Repas" },{objet:"Débat", display:"Débat" }]



class EventModalEdition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventEdited: eventNone,
      dialogVisible: false,
      dialogType: "",
      dialogValue: "",
      datePickerVisible: false,
      sendingDataLoading: false,
      selectAsso: false,
      selectCategories:false,
      eventAdded: false
    };
  }

  _inputChanged = (dialog, text) =>{
    if (dialog){
      this.setState({dialogValue: text});
    } else if (this.state.dialogType!="time"){
      this.setState({dialogVisible:false,eventEdited:{...this.state.eventEdited,[this.state.dialogType]:this.state.dialogValue} })
    }

    }

  _showDialogInput(value, type) {
    if (type === "time") {
      this.setState({datePickerVisible: true, dialogType: type});
    } else if (type === "asso") {
      this.setState({dialogType: type, dialogValue: value, selectAsso: true});
    } else if (type === "categories") {
      this.setState({dialogType: type, dialogValue: value, selectCategories: true});
    } else {
      this.setState({
        dialogVisible: true,
        dialogValue: value,
        dialogType: type
      });
    }
  }

  _handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  _handleValidate = () => {
    if (
      this.state.dialogType === "price" &&
      !Number(this.state.dialogValue) &&
      Number(this.state.dialogValue) != 0
    ) {
      Alert.alert("Vous devez absolument rentrer un nombre!");
    } else {
      this._inputChanged(false);
    }
  };

  _handleConfirmDate(value) {

          this.setState({dialogVisible:false,eventEdited:{...this.state.eventEdited,time:value/1000}, datePickerVisible:false })
  }

  _handleCancelDate() {
    this.setState({datePickerVisible: false});
  }

  _inputComponent = (text, type)=> {
    var textStyle = {};
    if (type === "name") {
      textStyle = styles.title;
    } else if (type === "price" && this.state.eventEdited.price === "0") {
      text = "Prix : Gratuit";
    } else if (type === "price") {
      text = text + "€";
    } else if (type==="asso"){
      text = this.state.eventEdited.asso
      text = "Organisateur : " + text.join(", ")
    } else if (type==="categories"){
      text = this.state.eventEdited.categories
      text = "Catégorie : " + text.join(", ")
    }
    return (
      <TouchableOpacity onPress={() => this._showDialogInput(this.state.eventEdited[type], type)}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }

  handleOnPress() {
    console.log("button pressed");
    ImagePicker.launchImageLibraryAsync({mediaTypes: "Images", quality: 0.5})
      .then(result => {
        if (!result.cancelled) {
          // User picked an image
          const {height, width, type, uri} = result;
          console.log("image picked", uri);
          this.setState({eventEdited:{...this.state.eventEdited,img:{uri:uri}}});
        }
      })
      .catch(error => {
        throw error;
      });
  }

  _alertElementManquant(element) {
    console.log("Element manquant");
    Alert.alert("Il faut absolument mettre " + element + "!");
    this.setState({sendingDataLoading: false});
    return null;
  }

  async _supprimerEvent() {
    this.setState({sendingDataLoading: true});
    await fb.supprimerDoc("events", this.props.event.id);
    await fb.supprimerImage("/Cover-events/" + this.props.event.id);
    this.setState({sendingDataLoading: false, eventEdited:eventNone});
  }

  _sendData = async()=> {
    this.setState({sendingDataLoading: true});
    var docID = this.props.event.id
    var img = this.state.eventEdited.img
    delete this.state.eventEdited.img
    delete this.state.eventEdited.id
    var eventEditedForFb = this.state.eventEdited
    eventEditedForFb.time=await fb.createTimeStamp(this.state.eventEdited.time * 1000)

    if (this.props.new) {
      if (img === 43) {
        return _alertElementManquant("une image");
      }
      if (this.state.eventEdited.name === "Nom évènement") {
        return _alertElementManquant("un nom d'évènement");
      }
      if (!this.state.eventEdited.asso[0]) {
        return _alertElementManquant("une asso");
      }
      if (
        this.state.eventEdited.details ===
        "C'est là où vous devez mettre la description de l'évènement"
      ) {
        return _alertElementManquant("une description");
      }
      if (this.state.eventEdited.price === "0") {
        return _alertElementManquant("un prix");
      }
      if (this.state.eventEdited.time < new Date() / 1000) {
        return _alertElementManquant("une date valide");
      }

      console.log("Adding a new document...");
      var error = false
      var docRef = await fb
        .addDataInDatabase("events", eventEditedForFb)
        .catch(err => error=err);

      if (!error){
        notif.sendPushNotification(fb.getToken(eventEditedForFb.asso, ["modo", ...eventEditedForFb.asso], false), 'default', eventEditedForFb.name, "L'événement " + eventEditedForFb.name + " a été ajouté au calendrier! Il aura lieu le : " + syst.convertToFrenchDate(eventEditedForFb.time, "fullLetter", true), eventEditedForFb.name, "Quelqu'un a rajouté cet événement, il a pour ref : " + docRef.id + ". Veuillez vérifier que cet événement est vrai, sinon faites la démarche de le supprimer.")
      }
      docID = docRef.id;
    } else {
      await fb.writeInDatabase("events", docID, eventEditedForFb);
    }

    var extension = img.uri;
    extension = extension.split(".");
    extension = extension[extension.length - 1];

    syst.uriToBlob(img.uri).then(blob => {
      return fb.addFileInStorage(
        blob,
        "/Cover-events/" + docID + "." + extension
      );
    });

    await fb.updateLastUpdateTime("events");

    this.props.toggle();
    this.setState({eventEdited:eventNone,
      sendingDataLoading: false,
      eventAdded: true
    });
  }

  onSelectedItemsChange = selectedItems => {
    if (this.state.selectAsso){
    this.setState({eventEdited:{...this.state.eventEdited,asso: selectedItems}});
  } else if (this.state.selectCategories){
    if (this.state.eventEdited.categories.length===3){
      Alert.alert("Trop de catégories!", "Attention, vous pouvez sélectionner uniquement jusqu'à 3 catégories. Choisissez donc bien!")
    } else {
      this.setState({eventEdited:{...this.state.eventEdited,categories: selectedItems}});
    }
  }};

  render() {
    var supprimerEvent;
    var multiSelectionAsso;
    var multiSelectionCategories
    console.log(
      "****************** EVENT MODAL EDITION ******************",
      this.state
    );

    if (this.props.accountType === 3) {
      supprimerEvent = (
        <LongButton
          onPress={() =>
            Alert.alert(
              "Suppression",
              "Etes-vous sûr de vouloir supprimer cet évènement?",
              [
                {
                  text: "Oui",
                  onPress: () => this._supprimerEvent()
                },
                {
                  text: "Annuler",
                  onPress: () => console.log("Suppression Annulée"),
                  style: "cancel"
                }
              ],
              {cancelable: false}
            )
          }
          title="Supprimer"
          style={styles.button}
        />
      );
    }
    if (this.state.selectAsso && this.state.eventEdited.asso != [" "]) {
      multiSelectionAsso = (
        <SelectionedMultiSelect
          items={this.props.assoList}
          uniqueKey="name"
          selectText="Choisissez une ou plusieurs assos"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.eventEdited.asso}
        />
      );
    }
    if (this.state.selectCategories && this.state.eventEdited.categories != [" "]) {
      multiSelectionCategories = (
        <SelectionedMultiSelect
          items={eventCategories}
          uniqueKey="objet"
          displayKey="display"
          selectText="Choisissez au maximum trois catégories"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.eventEdited.categories}
        />
      );
    }

    if (this.state.sendingDataLoading) {
      return (
        <Modal
          animationType="slide"
          isVisible={this.props.isVisible}
          onBackdropPress={() => {
            this.props.toggle();
            this.setState({eventEdited:eventNone});
          }}
          backdropTransitionOutTiming={0}
        >
          <LoadingComponent
            logoVisible={false}
            size={"large"}
            color={"#FF3333"}
            text={"On envoie ton évent!"}
            style={styles.logo}
          />
        </Modal>
      );
    } else {
      return (
        <Modal
          animationType="slide"
          isVisible={this.props.isVisible}
          onBackdropPress={() => {
            this.props.toggle();
            this.setState({eventEdited:eventNone});
          }}
          backdropTransitionOutTiming={0}
        >
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>{"Edition " + this.state.dialogType}</Dialog.Title>
            <Dialog.Description>Entrez la nouvelle valeur</Dialog.Description>
            <Dialog.Input
              value={this.state.dialogValue}
              selectionColor="red"
              style={{
                color: "black"
              }}
              onChangeText={text => this._inputChanged(true, text)}
            />
            <Dialog.Button label="Valider" onPress={this._handleValidate} />
            <Dialog.Button label="Annuler" onPress={this._handleCancel} />
          </Dialog.Container>
          <DateTimePickerModal
            isVisible={this.state.datePickerVisible}
            mode="datetime"
            isDarkModeEnabled={true}
            date={new Date()}
            onConfirm={value => this._handleConfirmDate(value)}
            onCancel={() => this._handleCancelDate()}
          />
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <View
                style={{
                  flex: 1.2
                }}
              >
                <Button
                  icon={
                    <Icon
                      type="font-awesome"
                      name="times"
                      size={15}
                      color={"red"}
                    />
                  }
                  onPress={() => {
                    this.props.toggle();
                    this.setState({eventEdited:eventNone});
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    borderRadius: 100
                  }}
                />
              </View>
              <View
                style={{
                  flex: 9,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {this._inputComponent(
                  this.state.eventEdited.name,
                  "name"
                )}
              </View>
              <View
                style={{
                  flex: 1.2
                }}
              >
                <Button
                  icon={
                    <Icon
                      type="font-awesome"
                      name="check"
                      size={15}
                      color={"green"}
                    />
                  }
                  onPress={async () => {
                    await this._sendData();
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    borderRadius: 100
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.handleOnPress()}
              style={{
                width: "100%",
                height: 200
              }}
            >
              <Image
                style={styles.cover}
                source={this.state.eventEdited.img}
                resizeMode={"cover"}
              />
            </TouchableOpacity>
            <ScrollView style={styles.infoContainer}>
              <View
                style={{
                  margin: 15
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "black"
                  }}
                >
                  {"Référence : " + this.props.event.id}
                </Text>
                <Text
                  style={{
                    fontSize: 23,
                    color: "black"
                  }}
                >
                  Infos Pratiques
                </Text>
                {this._inputComponent(
                  syst.convertToFrenchDate(
                    this.state.eventEdited.time,
                    "fullLetter"
                  ) +
                    " à " +
                    syst.getTimeFromDate(this.state.eventEdited.time),
                  "time"
                )}
                {this._inputComponent(
                  "Adresse : " + this.state.eventEdited.place,
                  "place"
                )}
                {this._inputComponent(
                  "Prix : " + this.state.eventEdited.price,
                  "price"
                )}
                {this._inputComponent(
                  "",
                  "asso"
                )}
                {multiSelectionAsso}
                {this._inputComponent(
                  "",
                  "categories"
                )}
                {multiSelectionCategories}
              </View>
              <CollapsibleComponent
                title={"À propos"}
                collapsedContent={<TouchableOpacity onPress={() =>
                  this._showDialogInput(this.state.eventEdited.details, "details")}>
                  <Text style={textStyles.h2}>
                    {this.state.eventEdited.details}
                  </Text>
                </TouchableOpacity>}
              />
              <CollapsibleComponent title={"Contact"} collapsedContent={<Text>{placeholder}</Text>} />
              <View
                style={{
                  paddingTop: 10,
                  alignItems: "center"
                }}
              >
                <LongButton
                  style={styles.button}
                  onPress={() =>
                    this._showDialogInput(this.state.eventEdited.sg, "sg")
                  }
                  title="Shotgun"
                />
                <LongButton
                  onPress={() =>
                    this._showDialogInput(this.state.eventEdited.sg, "fb")
                  }
                  title="Page Facebook"
                  style={styles.button}
                />
                {supprimerEvent}
              </View>
            </ScrollView>
          </View>
        </Modal>
      );
    }
  }

  componentDidUpdate() {
    if (this.state.eventEdited.name === "" && this.props.isVisible) {
      this.setState({eventEdited:{
        id: this.props.event.id,
        name: this.props.event.name,
        time: this.props.event.time,
        place: this.props.event.place,
        asso: this.props.event.asso,
        details: this.props.event.details,
        price: this.props.event.price,
        img: {
          uri: this.props.event.img
        },
        categories:this.props.event.categories
      }
      });
      if (this.props.event.img === " ") {
        this.setState({eventEdited:{...this.state.eventEdited,img: require("../../assets/icon.png")}});
      }
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 20,
    borderRadius: 10
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 22
  },
  cover: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 18,
    marginTop: 5
  },
  button: {
    marginBottom: 10
  },
  infoContainer: {
    flex: 1,
    borderRadius: 10,

    alignSelf: "stretch",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 5
  },
  input: {
    width: 70,
    height: 30,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 200,
    justifyContent: "center",
    alignContent: "center"
  },
  inputText: {
    fontSize: 14,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 30
  },
  textLoading: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold"
  }
});
export default EventModalEdition;
