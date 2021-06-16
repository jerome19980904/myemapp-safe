import React from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import * as Font from "expo-font";
import { StackActions, NavigationActions } from "react-navigation";

import { exitAlert, handleAndroidBackButton } from "../Components/backButton";
import LoadingComponent from "_Components/LoadingComponent";
import * as fb from "_root/firebase";

const connexionNav = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Accueil" })],
});

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._setPersistence();
    this.state = { fontLoaded: false };
  }

  _checkUserState() {
    console.log("Check user state");
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified === false) {
          this.props.navigation.replace("Login");
          console.log("Email non vérifié");
        } else {
          console.log("Email vérifié, connexion...");
          this.props.navigation.dispatch(connexionNav);
        }
      } else {
        console.log("Déconnexion...");
        this.props.navigation.replace("Login");
        // User is signed out.
      }
    });
  }

  _setPersistence() {
    fb.auth.setPersistence(fb.persistence);
  }

  async componentDidMount() {
    await Font.loadAsync({
      "OpenSans-Bold": require("../../../assets/font/OpenSans-Bold.ttf"),
      "Lato-Italic": require("../../../assets/font/Lato-Italic.ttf"),
      "Lato-Light": require("../../../assets/font/Lato-Light.ttf"),
      "Lato-Medium": require("../../../assets/font/Lato-Medium.ttf"),
      "Lato-Semibold": require("../../../assets/font/Lato-Semibold.ttf"),
    }).then(this._checkUserState());
    console.log("Fonts loaded");

    //handleAndroidBackButton(exitAlert);
  }

  render() {
    console.log("****************** LOADINGSCREEN ******************");
    return (
      <LoadingComponent
        logoStyle={styles.logo}
        logoVisible={true}
        size={"large"}
        color={"#FF3333"}
      />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
    marginBottom: 30,
  },
});

export default LoadingScreen;
