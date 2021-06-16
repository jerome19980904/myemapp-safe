import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles.js";



class AssosCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.textArea}>
          <Text style={textStyles.h2}>{this.props.title}</Text>
          <Text style={[textStyles.h5, { textAlign: "justify" }]}>
            {this.props.desc}
          </Text>
        </View>
        <View style={styles.logoArea}>
          <CacheImage
            style={styles.logo}
            firebaseFolder={this.props.folder}
            resizeMode={"contain"}
            firebaseFileName={this.props.name}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  logoArea: {
    justifyContent: "center",
  },
  logo: {
    width: 85,
    height: 85,
    resizeMode: "contain",
  },
  textArea: {
    flex: 1,
    marginRight: 5,
  },
});
export default AssosCard;
