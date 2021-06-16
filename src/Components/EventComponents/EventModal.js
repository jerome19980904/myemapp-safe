import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import {Icon, Button} from "react-native-elements";

import CacheImage from "_Components/CacheImage";
import * as syst from "_root/systemFunctions";
import CollapsibleComponent from "_Components/CollapsibleComponent";
import LongButton from "_Components/LongButton";

/*Pour utiliser l'EventModal, il faut l'appeler dans l'écran parent.
1) Importer l'EventModal dans l'écran parent

2) Appeler le component de la sorte
<EventModal
  isVisible={this.state.isModalVisible}
  toggle={() => this.toggleModal()}
  (le reste des props)
/>

3) Ajouter la méthode suivante dans l'écran parent

toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
}

Cette fonction permet de faire apparaître ou disparaître le modal. Il suffit donc de la lier avec un bouton, par exemple, pour faire apparaître le modal
*/

class EventModal extends React.Component {
  _mettreTitre(titre, texte){
    return (<Text>
      <Text style={{fontWeight:"bold"}}>{titre}</Text>
     <Text> {" : " + texte} </Text>
     </Text>)
  }
  render() {
    var fbLink = true;
    var sgLink = true;
    var price = "";
    if (this.props.event.fb) {
      fbLink = false;
    }
    if (this.props.event.shotgun) {
      sgLink = false;
    }

    function separerOrganisateurs(list) {
      var newList = [];
      if (list) {
        list.forEach(organisateur => newList.push(" " + organisateur));
      }
      return newList;
    }

    var refEvent;
    if (this.props.accountType === 3) {
      refEvent = (
          <Text>{"Référence : " + this.props.event.id}</Text>

      );
    }

    if (this.props.event.price === "0") {
      price = "Gratuit";
    } else {
      price = this.props.event.price + "€";
    }

    console.log("****************** EVENTMODAL ******************");
    return (
      <Modal
        animationType="slide"
        isVisible={this.props.isVisible}
        onBackButtonPress={() => this.props.toggle()}
        onBackdropPress={() => this.props.toggle()}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>{this.props.event.name}</Text>
            </View>
            <View
              style={{
                flex: 1
              }}
            >
              <Button
                icon={
                  <Icon
                    type="font-awesome"
                    name="times"
                    size={15}
                    color={"#FF3333"}
                  />
                }
                onPress={() => this.props.toggle()}
                buttonStyle={{
                  backgroundColor: "white",
                  borderRadius: 100
                }}
              />
            </View>
          </View>
          <CacheImage
            style={styles.cover}
            uri={this.props.event.img}
            resizeMode={"cover"}
          />
                      {refEvent}
          <Text>{this._mettreTitre("Catégories",separerOrganisateurs(this.props.event.categories))}</Text>
          <ScrollView style={styles.infoContainer}>
          <CollapsibleComponent
            title={"Infos pratiques"}
            collapsedContent={<View>
              {this._mettreTitre("\nDate",syst.convertToFrenchDate(this.props.event.time, "fullLetter"))}
              {this._mettreTitre("Heure",syst.getTimeFromDate(this.props.event.time, "h"))}
              {this._mettreTitre("Adresse",this.props.event.place)}
            {  this._mettreTitre("Organisateur",separerOrganisateurs(this.props.event.asso))}
              {this._mettreTitre("Prix",price)}
              </View>
            }
          />
            <CollapsibleComponent
              title={"À propos"}
              collapsedContent={<Text> {this.props.event.details}</Text>}
            />

            {/* <CollapsibleComponent title={"Contact"} content={placeholder} /> */}
            <View
              style={{
                paddingTop: 10,
                alignItems: "center"
              }}
            >
              <LongButton
                style={styles.button}
                onPress={() => console.log("Shotgun")}
                disabled={sgLink}
                title="Shotgun"
              />
              <LongButton
                onPress={() => console.log("Facebook")}
                title="Page Facebook"
                disabled={fbLink}
                style={styles.button}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
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
    marginTop: 5,
    marginBottom: 10
  },
  headerTitle: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default EventModal;
