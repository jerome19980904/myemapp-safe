//Style à utiliser partout dans l'application, sauf exception particulière
//Usage encore à définir clairement

import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
  //Grand titre, à utiliser rarement
  h1: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24,
  },

  //Titre, pour la plupart du temps
  h2: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },

  //Texte mis en valeur, pour mettre en avant ce qui est important
  h3: {
    fontFamily: "Lato-Semibold",
    fontSize: 17,
  },

  //Texte lambda, ce qu'on utilise d'habitude
  h4: {
    fontFamily: "Lato-Medium",
    fontSize: 16,
  },

  //Sous-titre, pour les photos, infos secondaire
  h5: {
    fontFamily: "Lato-Light",
    fontSize: 14,
  },
});

export default textStyles;
