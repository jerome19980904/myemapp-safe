import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import SponsorCard from "_Components/SponsorCard";
import CacheImage from "_Components/CacheImage";
import sponsors from "./VerbaData/SponsorData.js";
import textStyles from "_styles/textStyles";
import data from "_Modules/Verbatem/VerbaData/EloquencePics.js";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as syst from "_root/systemFunctions";

export default class Sponsors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: 0
    };
  }

  _renderItem = ({ item }) => {
    return (
      <CacheImage
        style={styles.image}
        resizeMode={"cover"}
        firebaseFolder={"Verbatem"}
        firebaseFileName={item.name}
      />
    );
  };

  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "white" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "gray"
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    console.log("****************** ABOUT SCREEN ******************");

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.content}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={data}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({ activeSlide: index })}
            sliderWidth={syst.viewportWidth}
            layout={"default"}
            loop={true}
            itemWidth={syst.viewportWidth}
          />
          {this.pagination}
          <Text style={[textStyles.h1, styles.titleText]}>??loquence</Text>
          <Text style={[textStyles.h2, styles.sectionText]}>Le p??le EVENT</Text>

          <Text style={[textStyles.h4, styles.text]}>
            Le p??le EVENT de Verbat???em s???occupe de tous les ??v??nements en
            rapport ?? l?????loquence et propos??s par notre association aux
            ??tudiants de l???emlyon et de France en g??n??ral. {"\n"}
            {"\n"}Que ce soit nos concours d?????loquence, allant du stand-up du
            Gala aux Plaidoiries Du Manager en passant par le Concours des Voix,
            ou les ??vents plus d??tente comme les appart??s, le Debart???em, ou le
            concours d?????criture Early Writers, c???est l???occasion d???organiser,
            cr??er, et kiffer des ??vents de qualit?? !
          </Text>
          <Text style={[textStyles.h2, styles.sectionText]}>
            Le p??le EQUIPE
          </Text>

          <Text style={[textStyles.h4, styles.text]}>
            Le p??le EQUIPE, c???est une ??quipe d?????loquence et des formations et
            permanences propos??es ?? des orateurs s??lectionn??s qui souhaitent
            progresser. {"\n"}
            {"\n"}C???est aussi et surtout la possibilit?? de participer ?? des
            concours dans toute la France tout au long de l???ann??e, ainsi qu???au
            concours national de la FFDE ! {"\n"}
            {"\n"}Sans oublier des cours et des Masterclass, pour faire de vous
            les prochains Berryer de demain.
          </Text>

          <Text style={[textStyles.h2, styles.sectionText]}>Nos sponsors</Text>
          <SponsorCard sponsor={sponsors[0]} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1
  },
  titleText: {
    marginTop: 0
  },
  content: {
    marginHorizontal: 13
  },
  image: {
    height: 250,
    marginTop: 10
  },
  sectionText: {
    color: "#FF3333",
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 15
  }
});
