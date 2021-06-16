// Components/Portail des assos.js
import React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";

import BoutonAssoPortail from "_Components/BoutonAssoPortail";
import LoadingComponent from "_Components/LoadingComponent";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";

import { connect } from "react-redux";

const mapStateToProps = function (state) {
  return state;
};

class Portailassos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("****************** PORTAIL ASSOS ******************");

    if (this.props.assos.loading) {
      return (
        <LoadingComponent
          logoStyle={styles.logo}
          logoVisible={true}
          size={"large"}
          color={"#FF3333"}
        />
      );
    } else {
      return (
        <SafeAreaView style={styles.main_container}>
          <ScrollView>
            <UpdateReduxDataComponent dataToUpdate={"assos"} />
            <View style={styles.boutonAsso}>
              {this.props.assos.assosData
                .slice(0, this.props.assos.nbCatched)
                .map((assoInfo) => (
                  <BoutonAssoPortail
                    assoPassed={assoInfo}
                    key={assoInfo.name}
                  />
                ))}
            </View>
            <View style={styles.boutonAsso}>
              {this.props.assos.assosData
                .slice(this.props.assos.nbCatched)
                .map((assoInfo) => (
                  <BoutonAssoPortail
                    assoPassed={assoInfo}
                    key={assoInfo.name}
                  />
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boutonAsso: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },
});

export default connect(mapStateToProps)(Portailassos);
