import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";

import PhotoCaption from "./PhotoCaption";
import textStyles from "_styles/textStyles";

class CampagnesTab extends React.Component {
  _cadreTexte(texte, titre, componentFin) {
    return (
      <View style={styles.cadre}>
        <Text
          style={[textStyles.h3, { fontWeight: "bold", textAlign: "center" }]}
        >
          {titre}
        </Text>
        <Text style={[textStyles.h4, { textAlign: "justify" }]}>{texte}</Text>
        {componentFin}
      </View>
    );
  }
  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <Text style={[textStyles.h2, { textAlign: "center" }]}>
            Les campagnes késako ?{"\n"}
          </Text>
          <Text style={[textStyles.h4, { textAlign: "justify" }]}>
            Les campagnes servent à former les futurs mandats des associations à
            liste. Elles ne sont absolument pas obligatoires. Le bizutage y est
            formellement interdit et l'ambiance y est bonne enfant.{"\n"}
            {"\n"}Les campagnes se séparent en trois parties majeures :{"\n"}
          </Text>
          {this._cadreTexte(
            "Le but sera de trouver des sources de financement pour les événements que les listes vont organiser.",
            "Démarchage",
            null
          )}
          {this._cadreTexte(
            "Ce sont des épreuves organisées par les différentes associations. Pour gagner face aux autres listes, il faudra faire preuve d'ingéniosité, de motivation et bien sûr de bonne humeur.",
            "Défis",
            <PhotoCaption
              folder="Admissible"
              name="PhotoCampagne1.jpg"
              caption="Photo du défi BDS"
            />
          )}

          {this._cadreTexte(
            "C'est l'épreuve du feu, c'est le moment de montrer si vous feriez un bon associatif ou non. Vous devrez organiser un événement de A à Z pour tous les étudiants de l'école.",
            "Evénements",
            <PhotoCaption
              folder="Admissible"
              name="PhotoCampagne3.jpg"
              caption="Soirée organisée par les listes Ski Club"
            />
          )}

          <Text style={[textStyles.h4, { textAlign: "justify" }]}>
            {"\n"}On gagne les campagnes avec un groupe d'amis très soudé. Elles
            créent aussi d'excellents souvenirs et l'opportunité de nouer et
            d'entretenir des liens avec toutes les associations. À l'emlyon,
            toutes les associations collaborent entre elles, beaucoup
            d'événements sont co-organisés par deux associations, cela instaure
            un esprit de promo très fort.
          </Text>
          <PhotoCaption
            folder="Admissible"
            name="PhotoCampagne5.jpg"
            caption="Dîner organisé par les listes Petit Paumé"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 4,

    margin: 5,
  },

  cadre: {
    paddingVertical: 8,
    paddingHorizontal: 10,
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
    marginBottom: 10,
    marginHorizontal: 5,
  },
});

export default CampagnesTab;
