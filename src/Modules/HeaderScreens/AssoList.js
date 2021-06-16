import React, { Component } from "react";
import { Button, Text, View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";

import MenuBar from "_Components/MenuBar";
import * as types from "_Store/Actions/ActionsTypes";

const mapStateToProps = function (state) {
  return state;
};

class AssoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            Cliquez sur votre association, nous enverrons une demande à
            l'administrateur de votre module. Lorsqu'elle sera validée, vous
            pourrez apparaître comme membre de l'association sur l'appli.
          </Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.props.assos.assoList}
            renderItem={({ item }) => <MenuBar title={item.name} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  paragraph: {
    justifyContent: "flex-start",
  },
  list: {
    flex: 1,
    marginTop: 10,
    alignSelf: "stretch",
  },
  text: {
    marginTop: 35,
    alignContent: "flex-start",
    fontSize: 12,
    color: "#919192",
    textAlign: "justify",
    left: 15,
    flexWrap: "wrap",
    marginRight: 30,
    alignContent: "flex-start",
  },
});

export default connect(mapStateToProps)(AssoList);
