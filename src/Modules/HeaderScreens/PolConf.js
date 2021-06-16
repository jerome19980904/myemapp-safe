import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

import textStyles from "_styles/textStyles";

export default class PolConf extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.infoArea}>
          <Text style={[textStyles.h2]}>Politique de confidentialité</Text>

          <Text style={[textStyles.h3], {textAlign:"justify"}}>

            {"\n" +
            "Plug’n’Play en sa qualité de responsable de traitement est particulièrement attentive à la protection et au respect de votre vie privée. La présente politique de confidentialité a vocation à vous présenter la manière dont nous collectons, utilisons et partageons vos Données à caractère personnel et ce conformément au règlement européen 2016/679 du 26 avril 2016 et à la loi « informatique et libertés » du 6 janvier 1978 modifiée. Nous vous invitons à lire attentivement le présent document pour connaître et comprendre nos pratiques quant aux traitements de vos Données personnelles." +
            "\n" + "\n"}
            </Text>

            <Text style={[textStyles.h3], {textAlign:"justify", fontWeight:'bold'}}>
             {"Finalité des traitements" + "\n" }
             </Text>
             <Text style={[textStyles.h3], {textAlign:"justify"}}>
             {"Chaque collecte de données est réalisée spécifiquement pour des finalités explicites et visées clairement sur la page de l’application Mobile où les données sont collectées. A ce titre, il est rappelé que, en ce qui concerne la gestion de votre demande, les finalités de collecte et de traitement sont (i) la gestion de votre demande et (ii) l’amélioration des produits ou des prestations. La base juridique de ce traitement est l’exécution d’un contrat (article 6.1.b du règlement européen) ; Plug’n’Play se réserve la faculté de créer des moyens de collecte supplémentaires et/ou complémentaires. A ce titre, Plug’n’Play précisera, conformément à la réglementation, les finalités propres au traitement concerné sur la page de collecte des données. Il n’existe aucune prise de décision entièrement automatisée par Plug’n’Play sur la base de vos données personnelles." +
             "\n" + "\n" }
             </Text>

             <Text style={[textStyles.h3], {textAlign:"justify", fontWeight:'bold'}}>
             {"Destinataire des traitements" + "\n" }
             </Text>
             <Text style={[textStyles.h3], {textAlign:"justify"}}>{
             "Les seuls destinataires des données sont les équipes de Plug’n’Play travaillant sur My EM App. Les transmissions de données personnelles avec les destinataires (quelle que soit leur nature juridique, responsable de traitement ou simple destinataire) sont réalisées de manière sécurisée et en application d’un accord entre Plug’n’Play et chaque destinataire. Plug’n’Play s’engage à ce que chaque destinataire connaisse les principes directeurs de la protection des données personnelles et y soient soumis en application de la loi et/ou d’un contrat spécifique." +
             "\n" + "\n" }
             </Text>

             <Text style={[textStyles.h3], {textAlign:"justify", fontWeight:'bold'}}>
             {"Conservation de vos données personnelles" + "\n" }
             </Text>
             <Text style={[textStyles.h3], {textAlign:"justify"}}>
             {"Plug’n’Play prend le soin de stocker vos données personnelles de manière sécurisée et conformément à la réglementation. Les durées de conservation pratiquées par Plug’n’Play respectent la réglementation applicable au jour des présentes, à savoir pour les données relatives à l’entrée en relation avec Plug’n’Play, pour une durée de 3 ans à compter de votre demande. Plug’n’Play se réserve la faculté de créer des moyens de collecte supplémentaires et/ou complémentaires. A ce titre, Plug’n’Play précisera, conformément à la réglementation, les durées de conservation propres au traitement concerné sur la page de collecte des données." +
             "\n" +  "\n" }
             </Text>

             <Text style={[textStyles.h3], {textAlign:"justify", fontWeight:'bold'}}>
             {"Firebase" + "\n" }
             </Text>
             <Text style={[textStyles.h3], {textAlign:"justify"}}>
             {"Dans nos applications, nous utilisons la technologie de Google Firebase (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, « Google ») avec différentes fonctionnalités. Firebase utilise ce que l’on appelle des « Instance IDs » afin de se souvenir des réglages individuels effectués dans l’application mobile. Chaque Instance ID étant unique à une application mobile et à l'appareil mobile que vous utilisez, Firebase peut évaluer et réagir à des processus spécifiques dans l'application mobile. Les informations générées par l'Instance ID concernant l’utilisation de cette application mobile sur votre appareil mobile sont généralement transférées vers un serveur Google aux États-Unis pour y être stockées. Si l'adresse IP est transmise, Google garantit que cette dernière est immédiatement rendue anonyme. La base juridique pour l'utilisation de Firebase est l'art. 6 alinéa 1 p. 1 f) RGPD. Pour plus d'informations, consultez les Conditions d'utilisation (https://firebase.google.com/terms/) et les remarques sur la protection des données (https://firebase.google.com/support/privacy/) de Firebase." +
              "\n" +  "\n" }
              </Text>

              <Text style={[textStyles.h3], {textAlign:"justify", fontWeight:'bold'}}>
            {"Vos droits" + "\n" }
            </Text>
            <Text style={[textStyles.h3], {textAlign:"justify"}}>
            {"Vous disposez des droits suivants :" + "\n" +
                "• Droit d’accès à vos données personnelles" + "\n" +
                "• Droit de rectification de vos données personnelles si elles sont inexactes ou incomplètes" + "\n" +
                "• Droit de limitation dans les conditions visées à l’article 18 du règlement européen" + "\n" +
                "• Droit d’effacement de vos données personnelles si : elles ne sont plus nécessaires au regard des finalités pour lesquelles elles ont été collectées ou traitées d'une autre manière" + "\n" +
                "• Vous retirez votre consentement pour ce qui concerne les traitements soumis à consentement (ex : prospection commerciale) ; Vous vous opposez valablement au traitement ; Elles ont fait l'objet d'un traitement illicite ; ou une loi l’oblige." + "\n" +
                "• Droit d’opposition pour motif légitime" + "\n" +
                "• Droit à la portabilité de vos données" + "\n" +
                "• Droit de définir des directives relatives au sort de vos données à caractère personnel après votre mort et, pour les traitements basés sur le consentement, de retirer votre consentement à tout moment. En vertu des articles 39 et 40 de la loi en date du 6 janvier 1978, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles." +
                "\n" + "\n" }
                </Text>

                <Text style={[textStyles.h3], {textAlign:"justify", fontWeight:'bold'}}>
            {"L'Utilisateur peut exercer ce droit :" + "\n" }
            </Text>
            <Text style={[textStyles.h3], {textAlign:"justify"}}>
                {"• Par email : myemapp.appli@gmail.com" +
               "\n" + "\n" +
            "En cas de réclamation, vous pouvez contacter la CNIL (www.cnil.fr). Vous pouvez inscrire sur la liste d’opposition au démarchage téléphonique sur www.bloctel.gouv.fr/" +
            "\n" + "\n" + "\n" +


            "Pour toutes questions supplémentaire ou problématiques concernant notre politique de respect de la vie privée, merci de nous contacter par mail à myemapp.appli@gmail.com." + "\n"  + "\n" +
            "© My EM App – Mars 2020"}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10, paddingTop:10
  },
  text: { fontSize: 14, textAlign:"justify", paddingTop:10 },
});
