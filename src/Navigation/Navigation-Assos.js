import React from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "react-navigation-stack";

import PNPTabNavigator from "./Navigation-PNP";
import VerbaStackNavigator from "./Navigation-Verba";
import PortailAssos from "_Modules/Accueil/PortailAssos";
import SkiClub from "./Navigation-SkiClub";

const AssosStackNavigator = createStackNavigator(
  {
    PnP: PNPTabNavigator,
    Verba: VerbaStackNavigator,
    Portail: PortailAssos,
    SkiClub: SkiClub
  },
  {
    initialRouteName: "Portail",
    headerMode: "none",
    navigationOptions: {
      gestureEnabled: false
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18
  }
});

export default AssosStackNavigator;
