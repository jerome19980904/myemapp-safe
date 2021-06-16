import React, { Component } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";

import textStyles from "_styles/textStyles";

export default class A_propos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={[textStyles.h2, styles.title]}>myEMapp</Text>
          <Text style={[textStyles.h4, styles.text]}>
            L'application myEMapp est le projet de coeur de l'association PnP.
            Disponible depuis avril 2020, l'application a et aura toujours pour
            objectif d'améliorer et repenser le lien entre les étudiants et les
            associations. Pour cela, nous visons à faciliter la vie étudiante
            sur le campus, en proposant une plateforme où les étudiants pourront
            trouver toutes les informations essentielles en un instant.
          </Text>
          <Text style={[textStyles.h2, styles.title]}>L'histoire</Text>
          <Text style={[textStyles.h4, styles.text]}>
            Avant myEMapp, le pôle Appli de PnP travaillait sur un projet
            d'application pour les 3 jours de la CRA. Mais avec l'annulation de
            cette application, nous nous sommes redirigés vers la création d'une
            application plus ambitieuse, plus complexe et plus intéressante. Le
            projet myEMapp est né.{"\n"}
            C'est donc depuis octobre 2019 que le pôle Appli travaille
            d'arrache-pied pour vous proposer cette application. Là encore, ça
            n'a pas été de tout repos. Il fallait encore réussir à se coordonner
            en fonction de nos stages, de nos fuseaux horaires.
            {"\n"}
            Au retour sur le campus d'Ecully en janvier 2020, il fallait
            maintenant trouver les créneaux pour travailler ensemble au gré des
            HH, des SAT et des cours (mais aussi des galères d'appartement).
          </Text>
          <Text style={[textStyles.h2, styles.title]}>L'équipe myEMapp</Text>
          <Text style={[textStyles.h4, styles.text]}>
            Le pôle myEMapp est pour le moment composé de 5 personnes avec des
            profils aussi divers que variés :{"\n"}
            {"\n"}
            Kamélia AZIROU, c'est celle en charge du design de l'application. Si
            tu as dans ton téléphone une application avec ce style sobre et
            moderne, c'est avant tout grâce à elle.{"\n"}
            {"\n"}
            Kevin TRING, c'est le dernier à avoir rejoint l'équipe. Motivé et
            volontaire, on peut toujours compter sur lui pour mener à bien
            toutes les tâches portant sur le développement.{"\n"}
            {"\n"}
            Mathis DOMINJON, notre Einstein, notre Bill Gates, notre Nicolas
            Tesla. C'est lui qui gère l'architecture des données de
            l'application, autant dire que c'est très technique. Créatif et
            rigoureux, c'est un véritable virtuose du code.{"\n"}
            {"\n"}
            Pierre-Antoine CLOUZEAU, aussi appelé PAC pour les intimes. Que dire
            de ce boug déjà là à l'aube du projet ? Il est quelqu'un de curieux
            et déterminé. Toujours à poser des questions et à vouloir en savoir
            le plus possible, PAC est aujourd'hui un des piliers de l'équipe.
            {"\n"}
            {"\n"}
            Et pour finir, Jérôme LIN, le respo du pôle ou aussi appelé l'homme
            à tout faire. Organiser les réunions, finaliser les détails, garder
            l'équipe motivée, c'est son quotidien. D'ailleurs, c'est lui qui a
            écrit cette page aussi. (Coucou !)
          </Text>
          <Text style={[textStyles.h2, styles.title]}>Remerciements</Text>
          <Text style={[textStyles.h4, styles.text]}>
            L'équipe myEMapp tient à remercier chaleureusement toutes les
            personnes sans qui ce projet aurait été impossible : {"\n"} {"\n"}
            Le Bureau de PnP 2020 : Mathilde Adjedj, Hugo Chagnon, Benoît Gay et
            Katérina Leprince pour leur soutien constant et inconditionnel.
            {"\n"}
            {"\n"}
            Tous les membres de PnP pour leurs encouragements et leurs retours.
            {"\n"}
            {"\n"}
            Alice Dubois, la respo Corpo pour PnP, pour ses précieux conseils.
            {"\n"}
            {"\n"}
            Et bien sûr à toi devant ton écran. Merci encore d'avoir téléchargé
            l'application, nous espérons que l'application te plaît.
          </Text>
          <Text style={[textStyles.h3, styles.signature]}>
            Très sincèrement,{"\n"}L'équipe myEMapp
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  title: {
    color: "#FF3333",
    marginTop: 30,
    marginBottom: 5
  },
  text: {},
  signature: {
    marginTop: 20,
    textAlign: "right"
  }
});
