import React, { Component } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Marker } from "react-native-maps";
import { Polygon } from "react-native-maps";

import LyonModal from "./LyonModal.js";
import MapView from "react-native-maps";
import data1 from "./LyonCoordinatesData.js";


var alertSeen = false;

class LyonLogement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "calendar",
      dateSelected: {},
      isModalVisible: false,
      displayedEvent: {},
      isLoading: true,
    };
  }
  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  componentDidMount() {
    if (alertSeen === false) {
      Alert.alert(
        "Guide des arrondissements",
        "Nous te proposons ici un guide sur les meilleurs quartiers où habiter à Lyon. Appuie sur les zones en couleur pour voir la description de l'arrondissement."
      );
      alertSeen = true;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LyonModal
          isVisible={this.state.isModalVisible}
          toggle={() => this.toggleModal()}
          name={this.state.modalName}
          folder={this.state.imgFolder}
          fileName={this.state.imgName}
          content={this.state.content}
          loyer={this.state.loyer}
          time={this.state.time}
        />
        <MapView
          initialRegion={{
            latitude: 45.75,
            longitude: 4.85,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ flex: 1 }}
        >
          <Marker
            coordinate={{ latitude: 45.78499686, longitude: 4.7583303 }}
          />
          <Polygon
            fillColor={"rgba(0, 200, 0, 0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon3.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon3.png",
                modalName: data1.lyon3.name,
                content: data1.lyon3.content,
                time: data1.lyon3.time,
                loyer: data1.lyon3.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(200, 0, 0, 0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon2.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon2.png",
                modalName: data1.lyon2.name,
                content: data1.lyon2.content,
                time: data1.lyon2.time,
                loyer: data1.lyon2.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(0, 0, 200, 0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon1.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon1.png",
                modalName: data1.lyon1.name,
                content: data1.lyon1.content,
                time: data1.lyon1.time,
                loyer: data1.lyon1.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(0, 200, 200, 0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon4.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon4.png",
                modalName: data1.lyon4.name,
                content: data1.lyon4.content,
                time: data1.lyon4.time,
                loyer: data1.lyon4.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(200, 0, 200, 0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon5.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon5.png",
                modalName: data1.lyon5.name,
                content: data1.lyon5.content,
                time: data1.lyon5.time,
                loyer: data1.lyon5.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(200, 200, 200, 0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon6.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon6.png",
                modalName: data1.lyon6.name,
                content: data1.lyon6.content,
                time: data1.lyon6.time,
                loyer: data1.lyon6.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(227,115,0,0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            coordinates={data1.lyon7.coordinates}
            tappable={true}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon7.png",
                modalName: data1.lyon7.name,
                content: data1.lyon7.content,
                time: data1.lyon7.time,
                loyer: data1.lyon7.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
          <Polygon
            fillColor={"rgba(220,4,271,0.5)"}
            strokeColor="rgba(0,0,0,0.5)"
            tappable={true}
            coordinates={data1.lyon9.coordinates}
            onPress={() => {
              this.setState({
                imgFolder: "Lyon",
                imgName: "lyon9.png",
                modalName: data1.lyon9.name,
                content: data1.lyon9.content,
                time: data1.lyon9.time,
                loyer: data1.lyon9.loyer,
              });
              this.toggleModal();
              console.log(
                "*************************** MODAL APPEARED *********************************************"
              );
            }}
          />
        </MapView>
      </View>
    );
  }
}

export default LyonLogement;
