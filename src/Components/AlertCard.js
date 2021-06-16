import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles";

class AlertCard extends React.Component {
  componentDidMount() {
    console.log("****************** ALERT CARD ******************");
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Text style={[textStyles.h2, styles.title]}>ANNONCE</Text>
        <Text style={[textStyles.h4, styles.text]}>
          En raison des circonstances actuelles, les fonctionnalités liées aux
          événements associatifs ont été temporairement retirées de myEMapp.
          {"\n"}Merci de votre compréhension.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 8,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowColor: "grey",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: "#eb5252",
    elevation: 4,
    borderColor: "red",
  },

  title: {
    color: "white",
    textAlign: "center",
  },
  text: { color: "white", textAlign: "center" },
});
export default AlertCard;
