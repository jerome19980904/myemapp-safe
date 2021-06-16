import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import Modal from "react-native-modal";
import Carousel from "react-native-snap-carousel";

import CacheImage from "_Components/CacheImage";
import * as syst from "_root/systemFunctions";
import textStyles from "_styles/textStyles.js";

class EventPressed extends React.Component {
  _displayInfo(title, text) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={textStyles.h3}>{title}</Text>
        <Text style={textStyles.h5}>{text}</Text>
      </View>
    );
  }

  render() {
    const OpenURLButton = ({ url, children }) => {
      const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }, [url]);

      if (url != "") {
        return (
          <Button
            title={children}
            onPress={handlePress}
            buttonStyle={styles.button}
            type={"solid"}
            color={"#F9DB4B"}
          />
        );
      }
      return null;
    };
    let eventPressed = this.props.navigation.state.params.event;
    console.log("****************** EVENTPRESSED ******************");
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={textStyles.h2}>{eventPressed.name}</Text>
        </View>
        <View style={{ flex: 3, marginBottom: 20 }}>
          <Carousel
            ref={(c2) => {
              this._carousel2 = c2;
            }}
            data={eventPressed.img}
            renderItem={function ({ item }) {
              return (
                <View style={{ flex: 1 }}>
                  <CacheImage
                    style={styles.cover}
                    uri={item}
                    resizeMode={"cover"}
                  />
                </View>
              );
            }}
            sliderWidth={syst.viewportWidth}
            layout={"default"}
            loop={true}
            itemWidth={syst.viewportWidth * 0.8}
          />
        </View>
        <View style={{ flex: 3 }}>
          <ScrollView>
            {this._displayInfo("Catégorie : ", eventPressed.categorie)}
            {this._displayInfo("Participants : ", eventPressed.participants)}
            {this._displayInfo(
              "Association organisatrice : ",
              eventPressed.asso
            )}
            <Text style={textStyles.h5}>{eventPressed.details}</Text>
          </ScrollView>
        </View>

        <View style={{ justifyContent: "flex-end" }}>
          <OpenURLButton url={eventPressed.site}>Site Internet</OpenURLButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cover: {
    height: 220,
    width: "100%",
    borderRadius: 10,
  },
  button: {
    borderRadius: 30,
    width: 270,
    backgroundColor: "#FF3333",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default EventPressed;
