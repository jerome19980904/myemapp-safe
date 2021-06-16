import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import * as syst from "../systemFunctions";



export default class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this.props.data.length}
        activeDotIndex={this.props.activeSlide}
        containerStyle={{
          paddingTop: 0,
          paddingBottom: 0
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 15,
          marginTop: 0,
          backgroundColor: "#95989A"
        }}
      />
    );
  }

  render() {
    console.log("****************** CAROUSEL ******************");
    return (
      <View style={[styles.carousel, this.props.style]}>
        <Carousel
          ref={c => {
            this._carousel = c;
            ("  ");
          }}
          data={this.props.data}
          onSnapToItem={this.props.onSnapToItem}
          renderItem={this.props.renderItem}
          sliderWidth={syst.viewportWidth}
          layout={"default"}
          itemWidth={syst.viewportWidth * 0.8}
          autoplay={true}
          autoplayDelay={4000}
          autoplayInterval={12000}
          lockScrollWhileSnapping={true}
          loop={true}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    height: undefined,
    alignItems: "center"
  }
});
