import React from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

import LoadingComponent from "_Components/LoadingComponent";

class CustomWebView extends React.Component {
  renderLoadingView() {
    return (
      <LoadingComponent
        logoStyle={styles.logo}
        logoVisible={true}
        size={"large"}
        color={"#bc2b78"}
      />
    );
  }
  componentDidMount() {
    console.log("****************** CUSTOMWEBVIEW ******************");
  }

  render() {
    const link = this.props.navigation.state.params.link;
    return (
      <WebView
        onLoad={this.renderLoadingView}
        startInLoadingState={true}
        style={styles.main_container}
        source={{ uri: link }}
      />
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

export default CustomWebView;
