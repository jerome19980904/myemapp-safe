import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { connect } from "react-redux";

import Login from "_Modules/Root/Screen/Login";
import LoadingScreen from "_Modules/Root/Screen/LoadingScreen";
import Register from "_Modules/Root/Screen/Register";
import MDPOublie from "_Modules/Root/Screen/MDPOublie";
import CGUScreen from "_Modules/Root/Screen/CGUScreen";
import HelloWorld from "_root/HelloWorld";

import TabNavigatorAccueil from "./Navigation-Accueil";
import ModuleAdmissible from "./Navigation-Admissible";
import PortailAssos from "./Navigation-Assos";

import Settings from "_Modules/HeaderScreens/Settings.js";
import Profil from "_Modules/HeaderScreens/Profil.js";

import AssoList from "_Modules/HeaderScreens/AssoList.js";
import PolConf from "_Modules/HeaderScreens/PolConf.js";
import Credits from "_Modules/HeaderScreens/Credits.js";
import A_propos from "_Modules/HeaderScreens/A_propos.js";
import Admin from "_Modules/HeaderScreens/Admin.js";
import WebView from "_Components/BlogComponents/CustomWebView";

import HeaderComponent from "_Components/NavigationComponents/HeaderComponent";

const MainStackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    CGUScreen: {
      screen: CGUScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Accueil: {
      screen: TabNavigatorAccueil,
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    LoadingScreen: {
      screen: LoadingScreen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    MDPOublie: {
      screen: MDPOublie,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Admissible: {
      screen: ModuleAdmissible,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Portail: {
      screen: PortailAssos,
    },
    Settings: {
      screen: Settings,
    },
    Profil: {
      screen: Profil,
    },

    PolConf: {
      screen: PolConf,
    },
    AssoList: {
      screen: AssoList,
    },
    About: {
      screen: A_propos,
    },
    Credits: {
      screen: Credits,
    },
    WebView: {
      screen: WebView,
    },

    Admin: {
      screen: Admin,
    },
    HelloWorld: {
      screen: HelloWorld,
    },
  },
  {
    initialRouteName: "LoadingScreen",
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: (props) => <HeaderComponent route={props.navigation} />,
    },
  }
);

export default createAppContainer(MainStackNavigator);
