import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import AssosCard from "./AssosCard";
import textStyles from "_styles/textStyles";

const descBDA =
  "Fondé en 1996, le Bureau de Arts de l'emlyon fait partie des associations les plus actives de l'école.  Il organise différents événements qui mettent en avant l'art et la culture.";
const descBDE =
  "Association centrale pour la vie étudiante, le Bureau des Élèves est en charge de fédérer les étudiants en créant un esprit d'école. Il rythme la vie étudiante en organisant les soirées.";
const descSC =
  "Profitant d’un emplacement géographique privilégié à moins de deux heures des grandes stations alpines, le Ski Club offre aux étudiants la possibilité de profiter des joies des sports de glisse.";
const descPP =
  "Créé en 1968, le Petit Paumé est le média lyonnais spécialisé dans la recommandation de bons plans. En plus de publier un guide imprimé à plus 200 000 exemplaires, il organise aussi plus de 20 événements par an. ";

class AssosTab extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[textStyles.h4, { textAlign: "justify" }]}>
          A l'emlyon, nous avons 4 campagnes pour les 4 associations à liste.
          Que tu sois fêtard, créatif, sportif ou gourmet, il y en a pour tous
          les goûts !
        </Text>
        <AssosCard
          title={"BDA"}
          desc={descBDA}
          folder={"Logo-asso"}
          name={"BDA.png"}
        />
        <AssosCard
          title={"BDE"}
          desc={descBDE}
          folder={"Logo-asso"}
          name={"BDE.png"}
        />
        <AssosCard
          title={"Petit Paumé"}
          desc={descPP}
          folder={"Logo-asso"}
          name={"Petit Paumé.png"}
        />
        <AssosCard
          title={"Ski Club"}
          desc={descSC}
          folder={"Logo-asso"}
          name={"Ski Club.png"}
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

export default AssosTab;
