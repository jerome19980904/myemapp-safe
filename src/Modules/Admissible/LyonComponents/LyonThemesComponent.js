import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { withNavigation } from "react-navigation";

import textStyles from "_styles/textStyles";

class LyonThemesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }

  componentDidMount() {
    console.log("****************** LYON THEMES COMPONENT ******************");
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() =>
            Linking.openURL(this.props.uri).catch((err) =>
              console.error("Couldn't load page", err)
            )
          }
        >
          <View style={{ flex: 1 }}>
            <View style={styles.imgContainer}>
              <Image style={styles.image} source={{ uri: this.props.img }} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[textStyles.h3]} numberOfLines={2}>
                {this.props.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  imgContainer: {
    height: 120,
  },
  main_container: {
    height: 180,

    marginTop: 10,
    borderRadius: 4,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: "grey",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    elevation: 4,
  },
});

export default withNavigation(LyonThemesComponent);
