import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Icon, Button } from "react-native-elements";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles";

class EventModal extends React.Component {
  _displayInfo(title, text) {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10,
        }}
      >
        <Text
          style={[textStyles.h3, { fontSize: 16, textAlignVertical: "bottom" }]}
        >
          {title}
        </Text>
        <Text
          style={[textStyles.h4, { fontSize: 14, textAlignVertical: "bottom" }]}
        >
          {text}
        </Text>
      </View>
    );
  }
  render() {
    console.log("****************** LYONMODAL ******************");
    return (
      <Modal
        animationType="slide"
        isVisible={this.props.isVisible}
        onBackButtonPress={() => this.props.toggle()}
        onBackdropPress={() => this.props.toggle()}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={[textStyles.h2, styles.title]} numberOfLines={2}>
              {this.props.name}
            </Text>
            <Button
              icon={
                <Icon
                  type="font-awesome"
                  name="times"
                  size={30}
                  color={"#FF3333"}
                />
              }
              onPress={() => this.props.toggle()}
              buttonStyle={{
                backgroundColor: "transparent",
              }}
            />
          </View>

          <ScrollView style={styles.infoContainer}>
            {this._displayInfo("Prix moyen du loyer : ", this.props.loyer)}
            {this._displayInfo(
              "Temps de trajet jusqu'à l'école : ",
              this.props.time
            )}
            <CacheImage
              style={styles.cover}
              firebaseFolder={this.props.folder}
              firebaseFileName={this.props.fileName}
              resizeMode={"cover"}
            />
            <Text style={[textStyles.h5, { textAlign: "justify" }]}>
              {this.props.content}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  title: { fontSize: 20 },
  cover: {
    height: 150,
    width: "100%",
    marginVertical: 10,
  },
});
export default EventModal;
