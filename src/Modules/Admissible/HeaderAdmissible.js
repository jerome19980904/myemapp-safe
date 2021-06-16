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
import { connect } from "react-redux";

import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles.js";
import * as types from "_Store/Actions/ActionsTypes";

const mapStateToProps = function (state) {
  return state;
};

let leftComponent;
let rightComponent;

class HeaderAdmissible extends React.Component {
  constructor(props) {
    super(props);
  }

  _createHeader() {
    leftComponent = (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <Icon
          name="chevron-left"
          type="font-awesome"
          color="#FF0000"
          size={25}
          iconStyle={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    );
    rightComponent = (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("EcranInfos")}
      >
        <Icon
          name="info"
          type="material"
          size={32}
          color="#FF0000"
          containerStyle={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    this._createHeader();
    return (
      <Header
        leftComponent={leftComponent}
        leftContainerStyle={{}}
        rightContainerStyle={{ alignItems: "flex-end" }}
        containerStyle={styles.header}
        centerContainerStyle={{
          alignItems: "flex-start",
        }}
        rightComponent={rightComponent}
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
    height: 80,
  },
});

export default connect(mapStateToProps)(withNavigation(HeaderAdmissible));
