import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Button } from "react-native-elements"
;
import textStyles from "_styles/textStyles";
import * as syst from "_root/systemFunctions";



class LongButton extends React.Component {
  render() {
    console.log("****************** LONG BUTTON ******************");
    return (
      <Button
        color={this.props.color}
        buttonStyle={[ styles.button, this.props.style]}
        type={this.props.type}
        title={this.props.title}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        titleStyle={[textStyles.h3, this.props.titleStyle]}
      />
    );
  }
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: 270,
    backgroundColor: "#FF3333",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

LongButton.defaultProps = {
  color: "#F9DB4B",
  title: "Mettre un titre",
  type: "solid",
  onPress: () => console.log("LongButton pressed"),
};

export default LongButton;
