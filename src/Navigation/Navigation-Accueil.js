import React from "react";
import { StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import * as syst from "_root/systemFunctions.js";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import Fil_Actu from "_Modules/Accueil/Fil_Actu";
import EventScreen from "_Modules/Accueil/EventScreen";
import PortailAssos from "_Modules/Accueil/PortailAssos";
import Blog from "_Modules/Accueil/Blog";

const TabNavigator = createBottomTabNavigator(
  {
    "Accueil-Fil d'actu": {
      screen: Fil_Actu,
      navigationOptions: { title: "Fil d'actu" },
    } /*
    "Accueil-Evénements": {
      screen: EventScreen,
      navigationOptions: { title: "Événements" },
    },*/,
    "Accueil-Portail d'assos": {
      screen: PortailAssos,
      navigationOptions: { title: "Associations" },
    },
    "Accueil-Blog": {
      screen: Blog,
      navigationOptions: { title: "Blog" },
    },
  },
  {
    initialRouteName: "Accueil-Fil d'actu",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType = "material";
        let size = syst.viewportHeight / 35;

        if (routeName === "Accueil-Fil d'actu") {
          iconName = "home";
          iconType = "material-community";
        } else if (routeName === "Accueil-Evénements") {
          iconName = "calendar";
          iconType = "font-awesome";
        } else if (routeName === "Accueil-Portail d'assos") {
          iconName = "users";
          iconType = "font-awesome";
        } else if (routeName === "Accueil-Blog") {
          iconName = "newspaper";
          iconType = "material-community";
        }

        // You can return any component that you like here!
        return (
          <Icon size={size} name={iconName} type={iconType} color={tintColor} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "#FF3333",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: 14,
      },
      style: {
        height: syst.viewportHeight / 13,
        paddingBottom: 10,
        paddingTop: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 6.68,
        elevation: 16,
        borderTopWidth: 0.2,
      },
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
});

export default TabNavigator;
