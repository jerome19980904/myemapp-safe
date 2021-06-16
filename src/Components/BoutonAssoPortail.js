// Components/LogonomItem.js
import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import CacheImage from "./CacheImage";
import * as types from "_Store/Actions/ActionsTypes";
import textStyles from "_styles/textStyles";



const mapStateToProps = function (state) {
  return state;
};

class BoutonAssoPortail extends React.Component {
  _toggleAsso(asso) {
    const action = {
      type: types.TOGGLE_ASSO,
      value: asso,
    };
    this.props.dispatch(action);
  }

  render() {
    console.log("****************** BoutonAssoPortail ******************");
    if (this.props.assoPassed.catched) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.props.navigation.navigate(this.props.assoPassed.navigatorName);
            this._toggleAsso(this.props.assoPassed.name);
          }}
        >
          <View style={styles.main_container}>
            <CacheImage
              style={styles.logo_asso}
              uri={this.props.assoPassed.img}
              resizeMode={"contain"}
            />
            <Text style={[textStyles.h3]} numberOfLines={2}>
              {this.props.assoPassed.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Alert.alert(
              "Patience...",
              "L'équipe myEMApp travaille dur pour intégrer le Module " +
                this.props.assoPassed.name +
                " aussi vite que possible."
            )
          }
        >
          <View style={styles.main_container}>
            <CacheImage
              style={styles.logo_asso2}
              uri={this.props.assoPassed.img}
              resizeMode={"contain"}
            />
            <CacheImage
              style={styles.logo_asso3}
              uri={this.props.assoPassed.img}
              resizeMode={"contain"}
              notLoading={true}
            />
            {/*Logo_Asso2 et Logo_Asso3 servent à donner ce côté grisé des logos*/}
            <Text style={textStyles.h3} numberOfLines={2}>
              {this.props.assoPassed.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: "column",
    height: 140,
    width: 110,
    marginTop: 30,
    alignItems: "center",
    marginLeft: 10,
  },

  logo_asso: {
    width: 110,
    height: 110,
  },
  logo_asso2: {
    width: 110,
    height: 110,
    tintColor: "black",
  },
  logo_asso3: {
    width: 110,
    height: 110,
    position: "absolute",
    opacity: 0.3,
  },
});

export default withNavigation(connect(mapStateToProps)(BoutonAssoPortail));
