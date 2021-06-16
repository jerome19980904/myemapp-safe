import React, { useCallback } from "react";
import { Icon, Button } from "react-native-elements";
import { Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import CacheImage from "_Components/CacheImage";
import Collapsible from "react-native-collapsible";
import textStyles from "_styles/textStyles.js";



class LyonCollapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCollapsed: true };
  }

  _toggleCollapsed() {
    const currentState = this.state.isCollapsed;
    this.setState({ isCollapsed: !currentState });
  }

  componentDidMount() {
    console.log("****************** EVENT COLLAPSIBLE ******************");
  }

  _displayIcon() {
    if (this.state.isCollapsed) {
      return <Icon name="plus" type="feather" size={36} color="#CCCCCC" />;
    } else {
      return <Icon name="minus" type="feather" size={36} color="#CCCCCC" />;
    }
  }

  render() {
    var uri;
    console.log(
      "*************************** URI DANS LE RENDER ***************************"
    );
    const OpenURLButton = ({ children }) => {
      const handlePress = useCallback(async () => {
        if (Platform.OS === "ios") {
          uri = this.props.appleUri;
        } else {
          uri = this.props.androidUri;
        }

        const supported = await Linking.canOpenURL(uri);

        if (supported) {
          await Linking.openURL(uri);
        } else {
          Alert.alert(`Don't know how to open this URL: ${uri}`);
        }
      }, [uri]);

      if (this.props.appleUri != "") {
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
    var textContent = (
      <View style={{ marginBottom: 15 }}>
        <Text style={[textStyles.h5, styles.content]}>
          {this.props.content}
        </Text>
      </View>
    );
    if (this.props.touchable) {
      textContent = (
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={[textStyles.h5, styles.content]}>
            {this.props.content}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.main_container}>
        <TouchableOpacity onPress={() => this._toggleCollapsed()}>
          <View style={styles.titleBar}>
            <Text style={[textStyles.h3, { fontSize: 19 }]}>
              {this.props.title}
            </Text>
            {this._displayIcon()}
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.isCollapsed} duration={200}>
          <View style={styles.content}>
            <View style={styles.image}>
              <CacheImage
                resizeMode="cover"
                style={styles.picture}
                firebaseFolder={this.props.folder}
                firebaseFileName={this.props.fileName}
              />
            </View>
            {textContent}
            <View style={styles.buttonContainer}>
              <OpenURLButton>Lien vers l'app</OpenURLButton>
            </View>
          </View>
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picture: {
    height: 180,
    resizeMode: "cover",
    borderRadius: 15,
  },
  image: {
    flex: 1,
    marginBottom: 15,
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
  content: {
    marginTop: 10,
    textAlign: "justify",
  },
});
export default LyonCollapsible;
