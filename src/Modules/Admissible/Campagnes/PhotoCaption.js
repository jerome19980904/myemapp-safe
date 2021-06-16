import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles.js";



class PhotoCaption extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main_container}>
        <CacheImage
          style={styles.image}
          firebaseFolder={this.props.folder}
          resizeMode={"cover"}
          firebaseFileName={this.props.name}
        />
        <Text style={[textStyles.h5, styles.caption]}>
          {this.props.caption}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: "stretch",
    marginVertical: 15,
  },

  image: {
    resizeMode: "contain",
    height: 130,
    marginBottom: 5,
  },
  caption: { textAlign: "center" },
});
export default PhotoCaption;
