import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles.js";



class SocialMediaComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL("fb://page/2144515958931460")}
          style={styles.mediaContainer}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/facebook.png")}
          />
          <Text style={[textStyles.h4, styles.label]}>
            Vers notre page Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("http://instagram.com/_u/emlyonbschool")
          }
          style={styles.mediaContainer}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/instagram.png")}
          />
          <Text style={[textStyles.h4, styles.label]}>
            Vers notre Instagram
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("https://admissible.em-lyon.com/")}
          style={styles.mediaContainer}
        >
          <CacheImage
            style={[styles.image]}
            firebaseFolder={"Admissible"}
            firebaseFileName={"logo-admissibles.png"}
          />
          <Text style={[textStyles.h4, styles.label]}>
            Vers notre site Admissible
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  mediaContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    marginBottom: 5,
  },
  label: {
    textAlign: "center",
  },
});

export default SocialMediaComponent;
