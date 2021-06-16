import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import SponsorCard from "_Components/SponsorCard";
import CacheImage from "_Components/CacheImage";
import SocialMediaComponent from "_Components/SocialMediaComponent";
import { getURL } from "_root/firebase.js";
import sponsors from "../Data/sponsorData.js";
import textStyles from "_styles/textStyles";

let easterEggText = [
  "\n\nY a qu'un seul pôle !",
  " C'est le pôle WEB !",
  " Gros bisous du pôle WEB <3",
  "\n\nAh ouais tu es déter quand même !",
];

let mediaArray = [
  {
    title: "Instagram",
    link: "https://www.instagram.com/plugnplay_emlyon/?hl=fr",
    image: require("_assets/instagram.png"),
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/plug'n'play/",
    image: require("_assets/linkedin.png"),
  },
];

export default class Sponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: 0,
      webText:
        "s'occupe de tout ce qui touche au développement et au web. Peut être que le futur Steve Jobs est parmi nous ? Sinon, le site des étudiants, c'est nous. myEMApp, c'est nous aussi !",
    };
  }

  pressEasterEgg() {
    let pressedTime = this.state.pressed;
    if (pressedTime < 2) {
      this.setState({
        webText: this.state.webText + easterEggText[pressedTime],
        pressed: pressedTime + 1,
      });
    } else if (pressedTime < 20) {
      this.setState({
        webText: this.state.webText + easterEggText[2],
        pressed: pressedTime + 1,
      });
    } else if (pressedTime === 20) {
      this.setState({
        webText: this.state.webText + easterEggText[3],
        pressed: pressedTime + 1,
      });
      console.log(pressedTime);
    }
  }

  render() {
    console.log("****************** ABOUT SCREEN ******************");

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.content}>
          <CacheImage
            style={styles.image}
            firebaseFolder={"PNP"}
            firebaseFileName={"mandat.jpg"}
          />
          <Text style={[textStyles.h2, styles.sectionText]}>Nos pôles</Text>
          <TouchableWithoutFeedback onPress={() => this.pressEasterEgg()}>
            <Text style={[textStyles.h4, styles.text]}>
              Le pôle WEB {this.state.webText}
              {"\n"}
            </Text>
          </TouchableWithoutFeedback>
          <Text style={[textStyles.h4, styles.text]}>
            Le pôle EVENT s’occupe de tous les évents créés par PnP, ou les
            évents que PnP co-staff. Cela va du Gameloft à la Gamer’s Night, aux
            évents inter-asso, etc... Cette équipe s’occupe aussi des évents que
            nous allons proposer pendant les différentes semaines à thème à l’EM
            (Women’s Week, développement durable, IA, etc...)
            {"\n"}
            {"\n"}
            Et enfin le pôle SUPPORT. C'est le pôle qui gère les formations que
            nous fournissant aux étudiants, la production de contenu vidéo, de
            matériel physique destiné à améliorer nos projets et bien sûr la
            communication.
          </Text>

          <Text style={[textStyles.h2, styles.sectionText]}>
            Nos autres médias
          </Text>
          <SocialMediaComponent media={mediaArray} />
          <Text style={[textStyles.h2, styles.sectionText]}>Nos sponsors</Text>
          <SponsorCard sponsor={sponsors[0]} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
  },
  content: {
    marginHorizontal: 13,
  },
  image: {
    height: 250,
    marginTop: 10,
  },
  sectionText: {
    color: "#FF3333",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
  },
});
