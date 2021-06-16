import React from "react";
import { Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import HeaderComponent from "_Components/NavigationComponents/HeaderComponent";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import VerbaEloquence from "_Modules/Verbatem/VerbaEloquence";
import VerbaJournalisme from "_Modules/Verbatem/VerbaJournalisme";
import AboutScreenVerba from "_Modules/Verbatem/AboutScreenVerba";

const VerbaTabNavigator = createBottomTabNavigator(
  {
    "À propos-éloquence": {
      screen: VerbaEloquence,
      navigationOptions: { title: "Éloquence" }
    },
    "Accueil-Verba": {
      screen: AboutScreenVerba,
      navigationOptions: { title: "Accueil" }
    },
    "À propos-journalisme": {
      screen: VerbaJournalisme,
      navigationOptions: { title: "Journalisme" }
    }
  },
  {
    initialRouteName: "Accueil-Verba",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType = "font-awesome";
        let size = 25;
        if (routeName === "À propos-journalisme") {
          iconName = "newspaper";
          iconType = "material-community";
        } else if (routeName === "Accueil-Verba") {
          iconName = "home";
          iconType = "material-community";
        } else if (routeName === "À propos-éloquence") {
          iconName = "microphone-variant";
          iconType = "material-community";
        }

        // You can return any component that you like here!
        return (
          <Icon size={size} name={iconName} type={iconType} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#FF3333",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: 14
      },
      style: {
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.7,
        shadowRadius: 6.68,
        elevation: 16,
        borderTopWidth: 0.2
      }
    }
  }
);

const VerbaStackNavigator = createStackNavigator(
  {
    VerbaNav: {
      screen: VerbaTabNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    VerbaEloquence: {
      screen: VerbaEloquence,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    VerbaJournalisme: {
      screen: VerbaJournalisme,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "VerbaNav",
    defaultNavigationOptions: {
      gesturesEnabled: true,
      header: null
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18
  }
});

export default createAppContainer(VerbaStackNavigator);
