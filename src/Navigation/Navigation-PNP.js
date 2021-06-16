import React from "react";
import { Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { createBottomTabNavigator } from "react-navigation-tabs";

import AboutScreen from "_Modules/PNP/Screen/AboutScreen";
import CustomWebView from "_Components/BlogComponents/CustomWebView";
import EventScreen from "_Components/EventComponents/EventScreen_Ancien";

const TabNavigator = createBottomTabNavigator(
  {
    "PnP-À propos": {
      screen: AboutScreen,
      navigationOptions: { title: "À propos" },
    },
    "PnP-Calendrier": {
      screen: EventScreen,
      navigationOptions: { title: "Calendrier" },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType = "material";
        let size = 25;
        if (routeName === "PnP-À propos") {
          iconName = "home";
          iconType = "material-community";
        } else if (routeName === "PnP-Calendrier") {
          iconName = "calendar";
          iconType = "font-awesome";
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
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
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
