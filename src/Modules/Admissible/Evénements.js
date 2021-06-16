import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";

import EventCardAd from "./EventCardAd.js";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";
import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles";

const mapStateToProps = function (state) {
  return state;
};

class Evénements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var data;
    var ctg;
    ctg = this.props.admissible.categories;
    data = this.props.admissible.eventsList;

    return (
      <View style={styles.main_container}>
        <UpdateReduxDataComponent dataToUpdate={"admissible"} />
        <FlatList
          data={ctg}
          overScrollMode="always"
          keyExtractor={(cat) => cat.id}
          renderItem={function (cat) {
            var dataTriee = [];

            data.forEach((item) => {
              if (item.categorie === cat.item.id) {
                dataTriee.push(item);
              }
            });
            return (
              <View style={styles.carousel_container}>
                <Text
                  style={[
                    { textAlign: "center", marginBottom: 5 },
                    textStyles.h2,
                  ]}
                >
                  {cat.item.id}
                </Text>
                <Carousel
                  loop={true}
                  ref={(c) => {
                    this._carousel = c;
                  }}
                  data={dataTriee}
                  renderItem={function ({ item }) {
                    return (
                      <View style={{ flex: 1, marginTop: 5 }}>
                        <EventCardAd eventDisplayed={item} />
                      </View>
                    );
                  }}
                  sliderWidth={syst.viewportWidth}
                  layout={"default"}
                  itemWidth={syst.viewportWidth * 0.8}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  carousel_container: {
    marginBottom: 8,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    flex: 1,
  },
});

export default connect(mapStateToProps)(Evénements);
