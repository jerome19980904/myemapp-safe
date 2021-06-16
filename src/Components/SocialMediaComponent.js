/*Composant servant à mettre une liste de tous les autres médias. Avec une image cliquable + un petit texte

Utilisation
Créer un tableau dans l'écran souhaité comme suivant l'exemple :

let mediaArray = [
  {
    title: "Notre Instagram",
    link: "www.google.fr",
    image: require("_assets/facebook.png"),
  },
  {
    title: "Notre Instagram 2",
    link: "www.google.fr",
    image: require("_assets/facebook.png"),
  },
];

Ensuite, utiliser SocialMediaComponent de la sorte :
<SocialMediaComponent media={mediaArray}/> et c'est bon
*/

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
    console.log(this.props.media);
    const media = this.props.media;
    mediaList = media.map((mediaInfo) => (
      <TouchableOpacity
        onPress={() => Linking.openURL(mediaInfo.link)}
        style={styles.mediaContainer}
        key={mediaInfo.title}
      >
        <Image style={styles.image} source={mediaInfo.image} />
        <Text style={[textStyles.h4, styles.label]}>{mediaInfo.title}</Text>
      </TouchableOpacity>
    ));

    return <View style={styles.mainContainer}>{mediaList}</View>;
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
