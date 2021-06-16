import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import data2 from "_Modules/Admissible/LyonComponents/LyonDataList.js";
import LyonArrondCard from "_Modules/Admissible/LyonComponents/LyonArrondCard";
import textStyles from "_styles/textStyles.js";



class LyonLogement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("****************** LYON FLATLIST ******************");
    console.log(data2);
    return (
      <View style={styles.maincontainer}>
        <View style={styles.title}>
          <Text style={[textStyles.h2]}>Conseils Logement</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={data2}
            renderItem={({ item }) => (
              <LyonArrondCard
                name={item.name}
                loyer={item.loyer}
                time={item.time}
                content={item.content}
                folder={"Lyon"}
                filename={item.id + ".png"}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
  },
  list: {
    flex: 1,
    marginRight: 20,
    left: 10,
  },
});

export default LyonLogement;
