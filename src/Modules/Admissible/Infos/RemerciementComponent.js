import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles.js";



class RemerciementComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mediaContainer}>
          <CacheImage
            style={styles.image}
            firebaseFolder={"Logo-asso"}
            firebaseFileName={"PNP.png"}
          />
          <Text style={[textStyles.h4, styles.label]}>
            Plug'n'Play,{"\n"}l'association du digitale de l'emlyon
          </Text>
        </View>

        <View style={styles.mediaContainer}>
          <CacheImage
            style={styles.image}
            firebaseFolder={"Logo-asso"}
            firebaseFileName={"Westequila.png"}
          />
          <Text style={[textStyles.h4, styles.label]}>
            Westequila,{"\n"}mandat 2021 du BDE de l'emlyon
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  mediaContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: 80,
    width: 80,
    marginBottom: 5,
  },
  label: {
    textAlign: "center",
  },
});

export default RemerciementComponent;
