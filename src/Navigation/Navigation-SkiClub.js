import React from "react";
import { Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import EcranChantier from "_Modules/SkiClub/Screen/EcranChantier";

const StackNavigator = createStackNavigator(
  {
    "Ski Club-Chantier": {
      screen: EcranChantier,
    },
  },
  { headerMode: "none" }
);

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
});

export default StackNavigator;
