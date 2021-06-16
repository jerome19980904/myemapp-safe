import React from "react";
import { StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import EcranCampagne from "_Modules/Admissible/EcranCampagne";
import Evénements from "_Modules/Admissible/Evénements";
import EventPressed from "_Modules/Admissible/EventPressed";
import EcranInfos from "_Modules/Admissible/EcranInfos";
import ACA_Loading from "_Modules/Admissible/ACA_Loading";

import Lyon from "_Modules/Admissible/Lyon.js";
import SliderScreen from "_Modules/Admissible/SliderScreen";
import HeaderAdmissible from "_Modules/Admissible/HeaderAdmissible";

const TabNavigator = createBottomTabNavigator(
  {
    "Admissible-Evénements": {
      screen: Evénements,
      navigationOptions: { title: "Evénements" },
    },
    "Admissible-Lyon": {
      screen: Lyon,
      navigationOptions: { title: "Lyon" },
    },
    "Admissible-Campagne": {
      screen: EcranCampagne,
      navigationOptions: {
        title: "Campagnes",
      },
    },
  },
  {
    initialRouteName: "Admissible-Lyon",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Admissible-Evénements") {
          iconName = "calendar";
        } else if (routeName === "Admissible-Campagne") {
          iconName = "trophy";
        } else if (routeName === "Admissible-Lyon") {
          iconName = "building";
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type="font-awesome" color={tintColor} />;
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

const StackNavigator = createStackNavigator(
  {
    SliderScreen: {
      screen: SliderScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    ACA_Loading: {
      screen: ACA_Loading,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    TabNavigator: TabNavigator,
    EventPressed: EventPressed,
    EcranInfos: EcranInfos,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: (props) => <HeaderAdmissible route={props.navigation} />,
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
});

export default StackNavigator;
