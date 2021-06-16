import React from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import LoadingComponent from "_Components/LoadingComponent";

const mapStateToProps = function (state) {
  return state;
};

const goToACAModule = StackActions.replace({
  routeName: "TabNavigator",
});

class ACA_Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  navigateToModule() {
    if (!this.props.admissible.loading) {
      this.props.navigation.dispatch(goToACAModule);
    }
  }

  async componentDidMount() {}

  render() {
    console.log("****************** ACA LOADINGSCREEN ******************");
    console.log(this.props.admissible.loading);
    this.navigateToModule();
    return (
      <View style={styles.mainContainer}>
        <LoadingComponent
          logoStyle={styles.logo}
          logoVisible={true}
          size={"large"}
          color={"#FF3333"}
          text={"Chargement des images..."}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 30,
  },
});

export default connect(mapStateToProps)(ACA_Loading);
