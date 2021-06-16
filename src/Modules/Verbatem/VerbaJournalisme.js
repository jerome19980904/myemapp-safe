import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Linking
} from "react-native";
import SponsorCard from "_Components/SponsorCard";
import CacheImage from "_Components/CacheImage";
import sponsors from "./VerbaData/SponsorData.js";
import textStyles from "_styles/textStyles";

export default class Sponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: 0
    };
  }

  render() {
    console.log("****************** ABOUT SCREEN ******************");

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.content}>
          <CacheImage
            style={styles.image}
            resizeMode={"cover"}
            firebaseFolder={"Verbatem"}
            firebaseFileName={"M_pic.png"}
          />
          <Text style={[textStyles.h1, styles.titleText]}>Journalisme</Text>
          <Text style={[textStyles.h2, styles.sectionText]}>Le pôle M</Text>

          <Text style={[textStyles.h4, styles.text]}>
            Le M c’est LE journal de l’école. Des clefs pour aider les étudiants
            de l’emlyon avant, pendant, et après leur parcours à l’école. {"\n"}
            {"\n"}Tous les mois, le pôle M réalise des interviews pour informer
            les étudiants des dernières nouveautés concernant l’école, mais
            aussi les associations, le réseau alumni, les opportunités
            professionnelles et beaucoup d’autres choses ! {"\n"}
            {"\n"}La conception d’un journal du début à la fin, avec sa ligne
            éditoriale, ses opportunités de rencontre et de réseau, mais aussi
            la satisfaction d’aider la promo et de mettre en lumière des projets
            exceptionnels des étudiants et des associations.
            {"\n"}
          </Text>
          <Text style={[textStyles.h2, styles.sectionText]}>Le pôle SITE</Text>

          <Text style={[textStyles.h4, styles.text]}>
            Le pôle SITE, qui s’occupe, comme son nom l’indique du site du M.{" "}
            {"\n"}
            {"\n"}De l’analyse de données en passant par la construction et la
            mise à jour du site, c’est une partie essentielle du travail de
            journalisme que nous effectuons. On peut ainsi y retrouver tout ce
            qui concerne l’emlyon depuis de nombreuses années, et ce n’est pas
            prêt de s’arrêter ! {"\n"}
            {"\n"}Pour le lien de celui-ci, c’est{" "}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://le-m-verbatem.fr/")}
            >
              http://le-m-verbatem.fr/
            </Text>
          </Text>

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
    flex: 1
  },
  titleText: {
    marginTop: 20
  },
  content: {
    marginHorizontal: 13
  },
  image: {
    height: 250,
    marginTop: 10
  },
  sectionText: {
    color: "#FF3333",
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 15
  },
  link: { color: "blue", textDecorationLine: "underline" }
});
