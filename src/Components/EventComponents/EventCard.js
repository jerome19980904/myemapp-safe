import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {connect} from "react-redux";

import CacheImage from "../CacheImage";
import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles";

const mapStateToProps = function(state) {
  return state;
};

class EventCard extends React.Component {
  render() {
    console.log("****************** EVENTCARD ******************");
    var refEvent;
    var price = "";

    if (this.props.event.price === "0") {
      price = "Gratuit";
    } else {
      price = this.props.event.price + "€";
    }

    if (this.props.user.accountType === 3 && this.props.edition) {
      refEvent = (
        <View
          style={{
            borderRadius: 10,
            position: "absolute",
            backgroundColor: "black"
          }}
        >
          <Text style={[textStyles.h3, styles.ref]}>
            {"Ref: " + this.props.event.id}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          style={{
            flex: 1
          }}
          onPress={() => this.props.onPress()}
        >
          <View style={styles.imgContainer}>
            <CacheImage
              style={styles.image}
              uri={this.props.event.img}
              resizeMode="cover"
            />
            {refEvent}
          </View>
          <View style={styles.textContainer}>
            <Text style={[textStyles.h3, styles.title]}>
              {this.props.event.name}
            </Text>
            <View style={styles.infoView}>
              <Text style={[textStyles.h2, styles.date]}>
                {syst.convertToFrenchDate(this.props.event.time, "monthLetter") + " - " + syst.getTimeFromDate(this.props.event.time)}
              </Text>
              <Text style={[textStyles.h3, styles.price]}>{price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 180,
    flex: 1,
    marginBottom: 10,
    borderRadius: 4,
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowColor: "grey",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    elevation: 4
  },
  imgContainer: {
    height: 120
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  title: {
    color: "#646464",
    fontSize: 18
  },
  date: {
    color: "red",
    fontSize: 14
  },
  price: {
    color: "#646464",

    fontSize: 14
  },
  ref: {
    color: "white",
    margin: 5,
    fontSize: 14
  }
});
export default connect(mapStateToProps)(EventCard);
