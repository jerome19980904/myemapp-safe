import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";

import CacheImage from "_Components/CacheImage";
import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles";

class PromotedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { touched: false };
  }

  render() {
    console.log("****************** PROMOTEDCARD ******************");
    return (
      <View style={styles.main_container}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={{ flex: 1, borderRadius: 4 }}>
            <CacheImage
              style={styles.image}
              firebaseFolder={"Cover-events"}
              resizeMode={"cover"}
              firebaseFileName={this.props.data.imgPath}
            />

            <LinearGradient
              style={styles.overlay}
              colors={["transparent", "rgba(0,0,0,0.9)"]}
            />
            <View style={styles.overlayInfo}>
              <Text style={[textStyles.h2, styles.title]}>
                {this.props.data.title}
              </Text>
              <Text style={[textStyles.h5, styles.subtitle]}>
                {this.props.data.subtitle}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 170,
    width: "100%",
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    height: 170,
    width: "100%",
    borderRadius: 4,
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    height: 150,
  },
  overlayInfo: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    marginBottom: 5,
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    textAlign: "center",
  },
});
export default withNavigation(PromotedCard);
