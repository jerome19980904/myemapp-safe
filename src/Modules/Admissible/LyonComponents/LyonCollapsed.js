import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

import LyonCollapsible from "./LyonCollapsible";
import textStyles from "_styles/textStyles";

class LyonCollapsed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        style={{ marginTop: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={[textStyles.h2, styles.title, { flex: 2.5 }]}>
            Transports
          </Text>
          <Icon
            name="bus"
            type="font-awesome"
            size={20}
            color="black"
            containerStyle={{ flex: 1, justifyContent: "center" }}
          />
        </View>
        <View style={styles.infoContainer}>
          <LyonCollapsible
            title={"Métro/Bus"}
            folder={"Lyon"}
            fileName={"TCL.png"}
            androidUri={""}
            appleUri={""}
            content={
              "Le métro vous permettra de vous déplacer dans Lyon très facilement grâce à 4 lignes (A, B, C, et D). Le bus peut vous emmener jusqu'à l'emlyon et vous ramener chaque jour (3, 4, et le 55). TCL vous propose donc un abonnement à 32,50 euros/mois qui regroupe bus, métro et tramway, une nécessité si vous n'avez pas encore le permis !  "
            }
          />
          <LyonCollapsible
            title={"Vélo"}
            appleUri={""}
            androidUri={""}
            folder={"Lyon"}
            fileName={"velov.png"}
            content={
              "A Lyon tout se fait à pied ou à vélo. L'abonnement Vélo'v 1 an est à seulement 16,95€ et vous permettra de vous déplacer partout rapidement."
            }
          />
          <LyonCollapsible
            title={"Lime"}
            appleUri={""}
            androidUri={""}
            folder={"Lyon"}
            fileName={"lime.png"}
            content={
              "Un bijou de technologie disponible en un clic, la Lime ! Un peu partout dans Lyon, vous pourrez voir des trottinettes électriques disponibles grâce à l'application Lime. Nous vous conseillons donc de la télécharger, elles s'avèrent très pratiques en toutes circonstances."
            }
            folder={"Lyon"}
            fileName={"lime.png"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[textStyles.h2, styles.title, { flex: 2.5 }]}>
            Bons plans
          </Text>
          <Icon
            name="medkit"
            type="font-awesome"
            size={20}
            color="black"
            containerStyle={{ flex: 1, justifyContent: "center" }}
          />
        </View>
        <View style={styles.infoContainer}>
          <LyonCollapsible
            title={"Bredz"}
            appleUri={""}
            folder={"Lyon"}
            androidUri={""}
            fileName={"bredz.png"}
            content={
              "Vous cherchez un endroit pour manger, malheureusement il est 4h du matin et tout est fermé ? On ne peut que vous conseiller le fameux Bredz, situé dans le Vieux Lyon. Ouvert toute la nuit, il saura vous rassasier."
            }
            folder={"Lyon"}
            fileName={"bredz.png"}
          />
          <LyonCollapsible
            title={"Le Petit Salon"}
            folder={"Lyon"}
            appleUri={""}
            androidUri={""}
            fileName={"petit_salon.png"}
            content={
              "Le Petit Salon est un espace culturel et lieu de vie nocturne niché dans le 7ème arrondissement de Lyon. Derrière cette appellation se cache un immense espace composé de deux salles où plusieurs milliers de noctambule se réunissent chaque semaine autour d’une même passion : la musique. Concerts de musique électronique, de rap ou même des années 80, rythment cet établissement qui est devenu un point de ralliement pour les noctambules lyonnais."
            }
            folder={"Lyon"}
            fileName={"petit_salon.png"}
          />
          <LyonCollapsible
            title={"Le Boston"}
            folder={"Lyon"}
            appleUri={""}
            androidUri={""}
            fileName={"Boston.png"}
            content={
              "Situé au cœur de la Presqu’île de Lyon, le Boston Café est un bar-pub de nuit, dans une ambiance Pop/Rock Electro, dans un cadre atypique et chaleureux… jusqu'à l'aube !"
            }
            folder={"Lyon"}
            fileName={"Boston.png"}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[textStyles.h2, styles.title, { flex: 2.5 }]}>
            Les Applis
          </Text>
          <Icon
            name="mobile"
            type="font-awesome"
            size={20}
            color="black"
            containerStyle={{ flex: 1, justifyContent: "center" }}
          />
        </View>
        <View style={styles.infoContainer}>
          <LyonCollapsible
            title={"Lydia"}
            appleUri={
              "https://apps.apple.com/fr/app/lydia-paiement-mobile-securise/id575913704?l=en"
            }
            androidUri={
              "https://play.google.com/store/apps/details?id=com.lydia&hl=fr"
            }
            folder={"Lyon"}
            fileName={"lydia.png"}
            content={
              "L'appli obligatoire à l'emlyon pour payer les places des events, les bières au bar, ... Un 'must have'. "
            }
          />
          <LyonCollapsible
            title={"L'app Lime"}
            folder={"Lyon"}
            appleUri={
              "https://apps.apple.com/us/app/limebike-your-ride-anytime/id1199780189?ls=1"
            }
            androidUri={
              "https://play.google.com/store/apps/details?id=com.limebike&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            }
            fileName={"lime_app.png"}
            content={
              "Lyon est garni d’un grand nombre de trottinettes électriques qui faciliteront vos petits trajets si aucun Vélo’v n’est disponible."
            }
          />
          <LyonCollapsible
            title={"Citymapper"}
            folder={"Lyon"}
            appleUri={"https://apps.apple.com/fr/app/apple-store/id469463298"}
            androidUri={
              "https://play.google.com/store/apps/details?id=com.limebike&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            }
            fileName={"citymapper.png"}
            content={
              "Citymapper propose de calculer vos trajets en transport pour vous afin de trouver le plus rapide."
            }
          />
          <LyonCollapsible
            title={"L'app TCL"}
            folder={"Lyon"}
            appleUri={"https://apps.apple.com/fr/app/tcl/id579379606"}
            androidUri={
              "https://play.google.com/store/apps/details?id=fr.tcl.live&hl=fr"
            }
            fileName={"TCLapp.png"}
            content={
              "L'application vous permet de voir en direct l'évolution des transports et les horaires de passage des bus pour être sûr de n'en rater aucun."
            }
          />
          <LyonCollapsible
            title={"Bluely"}
            folder={"Lyon"}
            appleUri={"https://apps.apple.com/fr/app/bluely/id715673783"}
            androidUri={
              "https://play.google.com/store/apps/details?id=com.polyconseil.bluely&hl=fr"
            }
            fileName={"bluely.png"}
            content={
              "Cette appli vous permet de réserver une voiture électrique pour les trajets que vous ne pouvez faire en transport. Il y a des stations un peu partout dans Lyon ce qui les rend très pratiques."
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
  },
  infoContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    marginBottom: 20,
    shadowOffset: { height: 3, width: 3 },

    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    elevation: 4,
  },
});

export default LyonCollapsed;
