import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { withNavigation } from "react-navigation";

import CacheImage from "_Components/CacheImage";
import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles.js";

class EventCardAd extends React.Component {
  render() {
    console.log("****************** EVENTCARD ******************");

    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>
            this.props.navigation.navigate("EventPressed", {
              event: this.props.eventDisplayed,
            })
          }
        >
          <View style={styles.imgContainer}>
            <CacheImage
              style={styles.image}
              uri={this.props.eventDisplayed.img[0]}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={textStyles.h3}>{this.props.eventDisplayed.name}</Text>
            <View style={styles.infoView}>
              <Text style={[textStyles.h5, styles.info]}>
                {this.props.eventDisplayed.categorie}
              </Text>

              <Text style={[textStyles.h5, styles.info]}>
                {"Participants : " + this.props.eventDisplayed.participants}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 180,
    flex: 1,
    marginBottom: 10,
    borderRadius: 4,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: "grey",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    elevation: 4,
  },
  imgContainer: {
    height: 120,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  infoView: { flexDirection: "row", justifyContent: "space-between" },
  info: {
    color: "#646464",
  },
});
export default withNavigation(EventCardAd);
