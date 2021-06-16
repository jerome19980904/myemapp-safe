import React from "react";
import { StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Button, Icon } from "react-native-elements";

import textStyles from "_styles/textStyles";



class MenuBar extends React.Component {
  render() {
    console.log("****************** BAR ******************");
    return (
      <TouchableOpacity style={styles.bar} onPress={this.props.onPress}>
        <Text style={[textStyles.h3, styles.text]}>{this.props.title}</Text>
        <Icon
          size={28}
          name={"chevron-right"}
          type={"material-community"}
          color={"#707070"}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  bar: {
    borderColor: "#E4E4E4",
    marginHorizontal: 8,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 70,
  },
  text: {
    color: "#707070",
  }
});

export default MenuBar;
