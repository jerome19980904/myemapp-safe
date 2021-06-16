import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";

import textStyles from "_styles/textStyles";

export default class SwitchButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("****************** SWITCHBUTTON ******************");
    const onPressFunction = this.props.onPress;
    const style = this.props.style;
    const options = this.props.options;
    const height = this.props.height;
    const fontSize = this.props.fontSize;
    var buttonColor = this.props.buttonColor;
    if (this.props.buttonColor) {
      styles.switch = { ...styles.switch, borderColor: buttonColor };
      styles.switchContainer = {
        ...styles.switchContainer,
        borderColor: buttonColor,
      };
      styles.switchContainerSelected = {
        ...styles.switchContainerSelected,
        backgroundColor: buttonColor,
      };
    }

    return (
      <SwitchSelector
        options={options}
        initial={0}
        style={[styles.switch, style]}
        textContainerStyle={styles.switchContainer}
        selectedTextContainerStyle={styles.switchContainerSelected}
        textColor={buttonColor}
        buttonColor={buttonColor}
        borderColor={"transparent"}
        borderRadius={8}
        fontSize={fontSize}
        height={height}
        onPress={onPressFunction}
        textStyle={textStyles.h3}
        selectedTextStyle={[textStyles.h3, { color: "white" }]}
      />
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FF3333",
  },
  switchContainer: {
    borderColor: "#FF3333",
  },
  switchContainerSelected: {
    borderRadius: 2,
    borderColor:"transparent",
    backgroundColor: "#FF3333",
  },
});
