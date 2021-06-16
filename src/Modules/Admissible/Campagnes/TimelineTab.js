import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Timeline from "react-native-timeline-flatlist";

import textStyles from "_styles/textStyles";

const timelineData = [
  {
    time: "Octobre",
    title: "Constitution des listes",
    description:
      "C'est le moment de constituer une liste pour l'une des 4 associations. Trouvez les gens les plus motivés, les plus sympas et bien sûr, avec qui vous vous entendez le mieux.",
  },
  {
    time: "Novembre",
    title: "Inscription des listes",
    description:
      "C'est le moment d'inscrire officiellement votre liste auprès de la Corpo (ceux qui encadrent et gèrent les campagnes). Si vous n'avez pas eu le temps de rejoindre une liste, pas de panique, vous pouvez encore rejoindre en cours de route.",
  },

  {
    time: "Février",
    title: "Lancement des campagnes",
    description:
      "C'est le moment de montrer ce que vous valez ! C'est le moment de rivaliser de créativité, de mettre votre organisation à l'épreuve face à vos concurrents. Mais c'est aussi le moment pour vous de rencontrer votre promo !",
  },
  {
    time: "Mars",
    title: "Résultats des campagnes",
    description:
      "Fin des campagnes ! Les prochains mandats des 4 associations à liste sont élus par les étudiants. Si vous avez perdu, il reste encore de nombreuses associations prêtes à vous accueillir.",
  },
];

class TimelineTab extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[textStyles.h4, { marginBottom: 30 }]}>
          Entre la formation des listes et le dénouement final, les campagnes
          s'étalent sur plus de 6 mois à l'emlyon. Voici une timeline
          récapitulative :
        </Text>
        <Timeline
          data={timelineData}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 90 }}
          timeStyle={[
            textStyles.h4,
            {
              textAlign: "center",
              backgroundColor: "#ff9797",
              color: "white",
              padding: 8,
              borderRadius: 10,
            },
          ]}
          descriptionStyle={[textStyles.h5, { textAlign: "justify" }]}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
});

export default TimelineTab;
