import React from "react";
import { Image, ActivityIndicator, View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import textStyles from "_styles/textStyles.js";

class LoadingComponent extends React.Component {
  render() {
    const logoStyle = this.props.logoStyle;
    const logoVisible = this.props.logoVisible;
    const size = this.props.size;
    const color = this.props.color;
    const text = this.props.text;
    const textStyle = this.props.textStyle;
    const modal = this.props.modal;
    var displayed;

    if (logoVisible) {
      displayed = (
        <View style={styles.main_container}>
          <Image
            style={[styles.logo, logoStyle]}
            source={require("../assets/logo2.png")}
          />
          <ActivityIndicator size={size} color={color} />
          <Text>{text}</Text>
        </View>
      );
    } else {
      displayed = (
        <View style={styles.main_container}>
          <ActivityIndicator size={size} color={color} />
          <Text style={textStyle}>{text}</Text>
        </View>
      );
    }

    if (modal) {
      return (
        <Modal
          animationType="slide"
          isVisible={this.props.isVisible}
          onBackButtonPress={() => this.props.toggle()}
          onBackdropPress={() => this.props.toggle()}
          backdropTransitionOutTiming={0}
        >
          {displayed}
        </Modal>
      );
    } else {
      return displayed;
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
  },
});

export default LoadingComponent;
