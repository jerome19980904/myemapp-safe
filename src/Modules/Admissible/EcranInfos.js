import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import SocialMediaComponent from "./Infos/SocialMediaComponent";
import RemerciementComponent from "./Infos/RemerciementComponent";
import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles.js";

class EcranInfos extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "associations",
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={[textStyles.h1, styles.title]}>À PROPOS</Text>
          <Text style={[textStyles.h3, styles.sectionText]}>myEMapp</Text>

          <Text style={[textStyles.h5, { textAlign: "justify" }]}>
            L'application que tu utilises en ce moment est l'application
            myEMapp, une application créée en 2020 par les étudiants de
            l'emlyon, de l'association Plug'n'Play. {"\n"}Le but de
            l'application est de devenir la plateforme incontournable de
            l'école, où on retrouvera toutes les informations sur la vie
            étudiante.
          </Text>

          <Text style={[textStyles.h3, styles.sectionText]}>
            Pour en savoir plus
          </Text>

          <Text style={[textStyles.h5, { textAlign: "justify" }]}>
            En plus de l'application, nos admisseurs ont aussi créé plusieurs
            autres plateformes sur lesquelles tu peux te renseigner sur les
            parcours proposés, sur l'école, sur les associations etc... N'hésite
            pas à y jeter un coup d'oeil !
          </Text>
          <SocialMediaComponent />
          <Text style={[textStyles.h3, styles.sectionText]}>Remerciements</Text>

          <Text style={[textStyles.h5, { textAlign: "justify" }]}>
            Nous tenons à remercier chaleureusement tous ceux sans qui ce module
            Admissibles n'aurait jamais été possible :
          </Text>
          <RemerciementComponent />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  title: {
    textAlign: "center",
  },

  sectionText: {
    color: "#FF3333",
    marginTop: 20,
  },
});

export default EcranInfos;
