import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import * as rssParser from "react-native-rss-parser";

var stockage;

function fetchBlogData() {
  return fetch("http://le-m-verbatem.fr/feed/")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      stockage = rss;
    });
}

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    data = fetchBlogData();
    return (
      <View style={styles.mainContainer}>
        <Button
          title="BUTTON"
          onPress={() => console.log(stockage.item[0].description)}
        />
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

//Commentaire
