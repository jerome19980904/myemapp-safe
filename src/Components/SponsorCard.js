import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { withNavigation } from "react-navigation";

import CacheImage from "./CacheImage";
import textStyles from "_styles/textStyles";



class SponsorCard extends React.Component {
  constructor(props) {
    super(props);
  }

  _openBrowser() {
    Linking.canOpenURL(this.props.sponsor.url).then((supported) => {
      if (supported) {
        Linking.openURL(this.props.sponsor.url);
      } else {
        console.log("Don't know how to open URI: " + this.props.sponsor.url);
      }
    });
  }

  render() {
    console.log("****************** SPONSORCARD ******************");
    return (
      <TouchableOpacity onPress={() => this._openBrowser()}>
        <View style={styles.main_container}>
          <View style={styles.logoArea}>
            <CacheImage
              style={styles.logo}
              firebaseFolder={this.props.sponsor.folder}
              firebaseFileName={this.props.sponsor.fileName}
            />
          </View>
          <View style={styles.textArea}>
            <Text style={textStyles.h2}>{this.props.sponsor.name}</Text>
            <Text style={textStyles.h4}>{this.props.sponsor.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    paddingVertical: 4,
    height: 130,
    marginHorizontal: 5,
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
    marginBottom: 3,
    marginTop: 3,
  },
  logoArea: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: undefined,
    height: 120,
    resizeMode: "contain",
  },
  textArea: {
    flex: 2,
    marginLeft: 10,
  },
});
export default withNavigation(SponsorCard);
