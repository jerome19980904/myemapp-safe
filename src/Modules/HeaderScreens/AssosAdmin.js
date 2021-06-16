import React, {Component} from "react";
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native";
import Dialog from "react-native-dialog";

import LoadingComponent from "_Components/LoadingComponent";
import CollapsibleComponent from "_Components/CollapsibleComponent";
import LongButton from "_Components/LongButton"
import * as syst from "_root/systemFunctions"
import * as fb from "_root/firebase";



class AssosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assosAsking: [],
      filtered:true,
      loading: false,
      update: true,
      dialogVisible:false,
      dialogType:"",
      dialogValue:"",
      dialogID : "",
    };
  }

  async _handleChoice(item, accepted) {
    if(accepted) {
      Alert.alert("Attention!!!", "Vous êtes sur le point d'accepter : " + item.firstName + " " + item.lastName + ". Est-ce bien cela que vous voulez?", [
        {
          text: "Oui",
          onPress: async () => {      this.setState({loading:true})
          await fb.writeInDatabase("usersData", item.userID, {asso : item.assoAsked}, true)
          await fb.supprimerDoc("assosAsking", item.docID)
          await notif.sendPushNotification(await fb.getToken(false, false, item.userID), 'default', "Demande d'Asso acceptée", "Votre demande pour rejoindre votre association a été vérifée et acceptée")
          this.setState({loading:false, update:true})}
        },
        {
          text: "Annuler",
          onPress: () => console.log("Attribution d'asso Annulée"),
          style: "cancel"
        }
      ],
      {cancelable: false})
      this.setState({loading:false})
    } else{
      Alert.alert("Attention!!!", "Vous êtes sur le point de refuser : " + item.firstName + " " + item.lastName + ". Est-ce bien cela que vous voulez?", [
        {
          text: "Oui",
          onPress: async () => {      this.setState({loading:true})
          await fb.supprimerDoc("assosAsking", item.docID)
          this.setState({loading:false, update:true})}
        },
        {
          text: "Annuler",
          onPress: () => console.log("Suppression Annulée"),
          style: "cancel"
        }
      ],
      {cancelable: false})
      this.setState({loading:false})
    }
  }

_returnCollapsibleComponent(item){
  var date = syst.convertToFrenchDate(item.date, "monthLetter", true)
  return (
    <View style={styles.main}>
        <View style={{flex:2,justifyContent:"center"}}>
          <Text style={{ fontWeight: "bold", fontSize: 16}}>
            {item.firstName + " " + item.lastName}
          </Text>
        </View>
      <Text style={{fontSize: 12}}>{"Asso demandée : " + item.assoAsked}</Text>

      <Text style={{fontSize: 12}}>
        {"Date : " + item.date}
      </Text>
    </View>
  );
}

_getAssosAsking = async () => {
  console.log("début");
  var asking = [];
  var askingNone = await fb.getData("assosAsking");
  askingNone.forEach(ask => {
    var docID = ask.id
    var askingData = ask.data();
    asking.push({
      docID : docID,
      userID : askingData.userID,
      firstName: askingData.firstName,
      lastName: askingData.lastName,
      assoAsked: askingData.assoAsked,
      date : askingData.date
    });
  });
  this.setState({assosAsking: asking, loading: false, update: false, filtered:false});
  console.log("fin");
};

  render() {
    if (!this.state.loading && this.state.update) {
      this.setState({loading: true});
      this._getAssosAsking()
    }

    if (!this.state.filtered){
      var askingFiltered = []
      var askingToFilter = this.state.assosAsking
      askingToFilter.forEach((asking)=>{
        if (asking.assoAsked===this.props.asso || this.props.accountType>1){
          askingFiltered.push(asking)
        }

      })
      this.setState({assosAsking:askingFiltered, filtered:true})
    }

    console.log("****************** ASSOS ADMIN ******************", this.state);

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
          <FlatList
            data={this.state.assosAsking}
            renderItem={({item}) => (
              <CollapsibleComponent
                collapsibleContent={this._returnCollapsibleComponent(item)}
                collapsedContent={<View style={styles.collapsed}>
                <LongButton
                  style={styles.button}
                  onPress= {()=> this._handleChoice(item, true)}
                  title="Accepter"
                />
                <LongButton
                  style={styles.button}
                  onPress= {()=> this._handleChoice(item, false)}
                  title="Refuser"
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

export default AssosAdmin;
