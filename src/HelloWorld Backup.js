import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Button title="BUTTON" onPress={() => console.log("Button Pressed")} />
        <Text>WORLD HELLO</Text>
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
});
