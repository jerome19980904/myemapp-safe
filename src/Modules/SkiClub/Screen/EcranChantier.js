import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import CountDown from "react-native-countdown-component";
import moment from "moment";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles";


export default class EcranChantier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDuration: 0,
    };
  }

  //La fonction ici sert à calculer le temps restant avant l'expirydate
  componentDidMount() {
    var that = this;
    //Date actuelle avec fuseau horaire Paris
    var date = moment().utcOffset("+01:00").format("YYYY-MM-DD hh:mm:ss");

    //Date de fin
    var expirydate = "2020-04-23 08:00:00";

    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());

    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds

    that.setState({ totalDuration: d });
    //Settign up the duration of countdown in seconds to re-render
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.body}>
          <Text style={[textStyles.h3, styles.title]}>En chantier</Text>
          <Text style={[textStyles.h2, styles.subtitle]}>
            Compte à rebours avant le début des Neptuniades
          </Text>

          <CountDown
            digitStyle={{
              backgroundColor: "#FF3333",
              marginLeft: 10,
            }}
            digitTxtStyle={[textStyles.h3, { color: "white", fontSize: 25 }]}
            timeLabelStyle={[textStyles.h1, { color: "#FF3333", fontSize: 14 }]}
            until={this.state.totalDuration}
            onFinish={() => alert("finished")}
            size={30}
            timeToShow={["H", "D", "M", "S"]}
            timeLabels={{
              d: "Jours",
              h: "Heures",
              m: "Minutes",
              s: "Secondes",
            }}
          />
        </View>
        <CacheImage
          style={styles.image}
          firebaseFolder={"Logo-asso"}
          firebaseFileName={"Ski Club.png"}
          resizeMode={"cover"}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  body: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 20,
  },
  title: {
    fontSize: 35,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 50,
  },
  image: {
    position: "absolute",
    height: 500,
    bottom: -100,
    left: 0,
    right: 0,
  },
});
