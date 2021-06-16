import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import {Icon} from "react-native-elements";
import Collapsible from "react-native-collapsible";

import textStyles from "_root/styles/textStyles";

class CollapsibleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isCollapsed: true};
  }

  _toggleCollapsed() {
    const currentState = this.state.isCollapsed;
    this.setState({isCollapsed: !currentState});
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

    var collapsibleContent;
    if (this.props.collapsibleContent) {
      collapsibleContent = this.props.collapsibleContent
    } else {
      collapsibleContent = (
        <View style={styles.titleBar}>
          <Text style={[textStyles.h3, styles.title]}>{this.props.title}</Text>
          {this._displayIcon()}
        </View>
      );
    }

    return (
      <View style={styles.main_container}>
        <TouchableWithoutFeedback onPress={() => this._toggleCollapsed()}>
          {collapsibleContent}
        </TouchableWithoutFeedback>
        <Collapsible collapsed={this.state.isCollapsed} duration={200}>
          <View>{this.props.collapsedContent}</View>
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
      flex: 1,
      margin: 10,
      borderRadius: 10,
      shadowOffset: {
        height: 3,
        width: 3
      },
      shadowColor: "grey",
      shadowRadius: 4,
      shadowOpacity: 0.5,
      backgroundColor: "white",
      elevation: 4,
      padding: 10,
      justifyContent: "center"

  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    color: "#565656"
  },
  main: {
    flex: 1,
    margin: 10,
    borderRadius: 4,
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowColor: "grey",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: "white",
    elevation: 4,
    padding: 10,
    justifyContent: "center"
  }
});
export default CollapsibleComponent;
