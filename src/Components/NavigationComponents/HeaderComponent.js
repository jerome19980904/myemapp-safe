import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Header, Button, Icon } from "react-native-elements";
import * as syst from "_root/systemFunctions";
import { connect } from "react-redux";
import * as types from "_Store/Actions/ActionsTypes";
import textStyles from "_styles/textStyles.js";

const mapStateToProps = function (state) {
  return state;
};

let title = "Accueil";
let leftComponent;
let centerComponent;

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _navigateSettings() {
    this.props.navigation.navigate("Settings");
  }

  _navigateProfile() {
    this.props.navigation.navigate("Profil");
  }

  _goBack() {
    const action = {
      type: types.TOGGLE_ASSO,
      value: "Accueil",
    };
    this.props.dispatch(action);

    this.props.navigation.goBack();
  }

  _createHeader() {
    if (this.props.navigation.state.routeName !== "Accueil") {
      leftComponent = (
        <Icon
          name="chevron-left"
          type="font-awesome"
          color="#FF0000"
          onPress={() => this._goBack()}
          size={25}
          iconStyle={{ marginRight: 15, alignSelf: "center" }}
        />
      );

      if (this.props.navigation.state.routeName === "Settings") {
        title = "Réglages";
      } else if (this.props.navigation.state.routeName === "Admin") {
        title = "Administrateur";
      } else if (this.props.navigation.state.routeName === "Credits") {
        title = "Crédits";
      } else if (this.props.navigation.state.routeName === "About") {
        title = " Propos";
      } else if (this.props.navigation.state.routeName === "PolConf") {
        title = "Confidentialité";
      } else {
        title = this.props.screen.currentAsso;
      }
    } else {
      leftComponent = null;

      if (this.props.navigation.state.index === 0) {
        title = "Fil d'actualité";
      }
      if (this.props.navigation.state.index === 1) {
        title = "Portail des Assos";
      } else if (this.props.navigation.state.index === 2) {
        title = "Blog";
      }
    }
  }

  render() {
    var routeName = this.props.navigation.state.routeName;
    if (
      routeName === "Accueil-Fil d'actu" ||
      routeName === "Accueil-Evénements" ||
      routeName === "Accueil-Portail d'assos"
    ) {
      const action = {
        type: types.TOGGLE_ASSO,
        value: "Accueil",
      };
      this.props.dispatch(action);
    }
    this._createHeader();

    console.log(
      "****************** HEADER ******************",
      this.props.navigation.state.routeName,
      this.props.navigation.state
    );
    centerComponent = (
      <Text style={[textStyles.h1, styles.title]}> {title} </Text>
    );
    return (
      <Header
        leftComponent={leftComponent}
        leftContainerStyle={{ flex: 0 }}
        rightContainerStyle={{}}
        containerStyle={styles.header}
        centerComponent={centerComponent}
        centerContainerStyle={{
          alignItems: "flex-start",
        }}
        rightComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Icon
              name="user"
              type="font-awesome"
              size={syst.viewportHeight / 25}
              containerStyle={{ marginRight: 20 }}
              onPress={() => this._navigateProfile()}
            />
            <Icon
              name="gear"
              type="font-awesome"
              size={syst.viewportHeight / 25}
              onPress={() => this._navigateSettings()}
            />
          </View>
        }
        statusBarProps={{ barStyle: "dark-content" }}
      />
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    justifyContent: "space-between",

    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: "grey",
    elevation: 5,
    height: syst.viewportHeight / 10,
  },
  title: {
    textAlign: "left",
  },
  logo: {
    marginLeft: 10,
    width: 50,
    height: 50,
  },
});

export default connect(mapStateToProps)(withNavigation(HeaderComponent));
