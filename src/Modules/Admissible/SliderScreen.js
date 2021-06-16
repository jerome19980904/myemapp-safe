import React from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import AppIntroSlider from "react-native-app-intro-slider";
import { connect } from "react-redux";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";
import * as fb from "_root/firebase";

const slides = [
  {
    key: 1,
    title: "Bienvenue !",
    text:
      "Bienvenue cher admissible sur le module Admissibles de myEMapp, l'application créée par les étudiants de l'emlyon, pour les étudiants !\n\nTu trouveras ici toutes les informations sur la vie étudiante de notre belle école.",
    image: require("../../assets/FlatDesign/mic.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Les événements",
    text:
      "La vie étudiante, c'est avant tout les événements organisés par les associations de l'école. Tu trouveras ici des informations sur nos événements phares.",
    image: require("../../assets/FlatDesign/balloon.png"),
    backgroundColor: "#ed722f",
  },
  {
    key: 3,
    title: "Les campagnes associatives",
    text:
      "Les campagnes associatives ont une place centrale dans notre école. On te détaille ici tout ce qu'il y a à savoir sur ce sujet.",
    image: require("../../assets/FlatDesign/stage.png"),
    backgroundColor: "#517ddb",
  },
  {
    key: 4,
    title: "La ville de Lyon",
    text:
      "Le point commun entre tous les étudiants de l'emlyon, c'est que nous sommes tous tombés amoureux de cette ville magnifique. Nous t'expliquons ici pourquoi.",
    image: require("../../assets/FlatDesign/coffee-shop.png"),
    backgroundColor: "#e05e83",
  },
];

class SliderScreen extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}
      >
        <View style={styles.header}>
          <Button
            title="Quitter"
            type="clear"
            titleStyle={[textStyles.h3, { color: "white", fontSize: 20 }]}
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
        <View style={styles.body}>
          <Text
            style={[
              textStyles.h2,
              { color: "white", fontSize: 26, textAlign: "center" },
            ]}
          >
            {item.title}
          </Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={item.image}
          />
          <Text
            style={[
              textStyles.h4,
              { color: "white", textAlign: "center", fontSize: 17 },
            ]}
          >
            {item.text}
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  _onDone = () => {
    this.props.navigation.navigate("ACA_Loading");
  };

  componentDidMount() {
    fb.auth
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      })
      .then(console.log("GUEST LOGIN"));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <UpdateReduxDataComponent dataToUpdate={"admissible"} />
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          nextLabel="Suivant"
          prevLabel="Retour"
          showPrevButton
          doneLabel="Continuer"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  header: {
    height: 80,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    height: 280,
    width: 280,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default SliderScreen;
