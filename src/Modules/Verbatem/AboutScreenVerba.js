import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import CacheImage from "_Components/CacheImage";
import SocialMediaComponent from "_Components/SocialMediaComponent";
import { Icon } from "react-native-elements";
import textStyles from "_styles/textStyles";

import { connect } from "react-redux";

const mapStateToProps = function(state) {
  return state;
};
let mediaArray = [
  {
    title: "Instagram",
    link: "https://www.instagram.com/verbatem_emlyon/",
    image: require("_assets/instagram.png")
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/verbatem-emlyon/",
    image: require("_assets/linkedin.png")
  }
];
const presText =
  "Verbat’em est l’association d’Eloquence et de Journalisme de l’emlyon Business School. Publiant le journal de l’école mensuellement tout en organisant de nombreux événements d’éloquence, c’est l’une des seules associations avec deux champs d’actions distincts et larges. D’autant plus de raisons d’y trouver ton bonheur ! ";

class AboutScreenVerba extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <CacheImage
          style={styles.image}
          resizeMode={"cover"}
          firebaseFolder={"Verbatem"}
          firebaseFileName={"verba_mandat.png"}
        />
        <View style={styles.textUp}>
          <Text style={[textStyles.h2, styles.title]}>Présentation</Text>

          <Text style={[textStyles.h4, styles.text]}>
            Verbat’em est l’association d’Eloquence et de Journalisme de
            l’emlyon Business School. {"\n"}
            {"\n"}Publiant le journal de l’école mensuellement tout en
            organisant de nombreux événements d’éloquence, c’est l’une des
            seules associations avec deux champs d’actions distincts et larges.
            {"\n"}
            {"\n"}D’autant plus de raisons d’y trouver ton bonheur !
          </Text>
        </View>

        <CacheImage
          style={styles.image1}
          resizeMode={"contain"}
          firebaseFolder={"Logo-asso"}
          firebaseFileName={"Verbat'em.png"}
        />
        <Text style={[textStyles.h2, styles.sectionText]}>
          Nos autres médias
        </Text>
        <SocialMediaComponent media={mediaArray} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 13
  },
  title: {
    color: "#FF3333",
    marginTop: 10
  },
  textBottom: {
    flex: 2
  },
  image: {
    height: 250,
    marginTop: 10
  },
  textUp: {
    flex: 2.5,

    marginRight: 20
  },
  ici: { fontWeight: "bold", color: "#FF3333" },
  image1: {
    marginTop: 20,
    height: 230,
    justifyContent: "center",
    alignContent: "center",
    resizeMode: "contain"
  },
  image2: {
    flex: 1,

    alignSelf: "center",
    right: 104
  },
  sectionText: {
    color: "#FF3333",
    marginTop: 20,
    marginBottom: 10
  },
  logo: {
    flex: 1,
    flexDirection: "row"
  },
  text: {
    marginTop: 10
  },
  navigContainer: {
    flex: 3,
    backgroundColor: "red"
  },
  arrow: {
    flex: 1,
    justifyContent: "center"
  }
});

export default connect(mapStateToProps)(AboutScreenVerba);
