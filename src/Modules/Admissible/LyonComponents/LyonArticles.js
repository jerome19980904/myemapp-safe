import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

import LyonThemesComponent from "./LyonThemesComponent";
import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles";
import data from "./LyonData";

class LyonArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={[textStyles.h2]}>À visiter</Text>
        <View style={styles.carousel_container}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={data[0].aVisiter}
            renderItem={function ({ item }) {
              return (
                <View style={styles.themes}>
                  <LyonThemesComponent
                    uri={item.uri}
                    img={item.img}
                    lyon={item}
                    name={item.name}
                  />
                </View>
              );
            }}
            sliderWidth={syst.viewportWidth}
            layout={"default"}
            itemWidth={syst.viewportWidth * 0.75}
            loop={true}
          />
        </View>
        <Text style={[textStyles.h2]}>Gastronomie</Text>
        <View style={styles.carousel_container}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={data[1].gastronomie}
            renderItem={function ({ item }) {
              return (
                <View style={styles.themes}>
                  <LyonThemesComponent
                    uri={item.uri}
                    img={item.img}
                    lyon={item}
                    name={item.name}
                  />
                </View>
              );
            }}
            sliderWidth={syst.viewportWidth}
            layout={"default"}
            itemWidth={syst.viewportWidth * 0.75}
            loop={true}
          />
        </View>
        <Text style={[textStyles.h2]}>Culture</Text>
        <View style={styles.carousel_container}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={data[2].culture}
            renderItem={function ({ item }) {
              return (
                <View style={styles.themes}>
                  <LyonThemesComponent
                    uri={item.uri}
                    img={item.img}
                    lyon={item}
                    name={item.name}
                  />
                </View>
              );
            }}
            sliderWidth={syst.viewportWidth}
            layout={"default"}
            itemWidth={syst.viewportWidth * 0.75}
            loop={true}
          />
        </View>
        <Text style={[textStyles.h2]}>Sortir à Lyon</Text>
        <View style={styles.carousel_container}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={data[3].sortirAlyon}
            renderItem={function ({ item }) {
              return (
                <View style={styles.themes}>
                  <LyonThemesComponent
                    uri={item.uri}
                    img={item.img}
                    lyon={item}
                    name={item.name}
                  />
                </View>
              );
            }}
            sliderWidth={syst.viewportWidth}
            layout={"default"}
            itemWidth={syst.viewportWidth * 0.75}
            loop={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  carousel_container: {
    flex: 1,
  },
  themes: { flex: 1, marginTop: 5, paddingBottom: 20 },
});

//Commentaire
export default LyonArticles;
