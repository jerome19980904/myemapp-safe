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

import CacheImage from "_Components/CacheImage";
import LyonModal from "_Modules/Admissible/LyonComponents/LyonModal.js";
import textStyles from "_styles/textStyles";

class LyonArrondCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }
  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  componentDidMount() {
    console.log("****************** LYON ARROND CARD ******************");
  }

  render() {
    const name = this.props.name;
    const img = this.props.img;
    const folder = this.props.folder;
    const filename = this.props.filename;
    const content = this.props.content;
    const loyer = this.props.loyer;
    const time = this.props.time;

    return (
      <View>
        <LyonModal
          isVisible={this.state.isModalVisible}
          toggle={() => this.toggleModal()}
          name={name}
          folder={folder}
          fileName={filename}
          content={content}
          loyer={loyer}
          time={time}
        />
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => {
            this.toggleModal();
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.imgContainer}>
              <CacheImage
                style={styles.image}
                firebaseFolder={folder}
                firebaseFileName={filename}
                resizeMode={"cover"}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[textStyles.h3]} numberOfLines={2}>
                {name}
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

export default withNavigation(LyonArrondCard);
