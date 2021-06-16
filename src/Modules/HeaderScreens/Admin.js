import React, {Component} from "react";
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";

import LoadingComponent from "_Components/LoadingComponent";
import CollapsibleComponent from "_Components/CollapsibleComponent";
import LongButton from "_Components/LongButton"
import * as syst from "_root/systemFunctions"
import * as fb from "_root/firebase";
import SwitchButton from "_Components/SwitchButton"
import UsersAdmin from "_Modules/HeaderScreens/UsersAdmin.js"
import AssosAdmin from "_Modules/HeaderScreens/AssosAdmin.js"

const mapStateToProps = function (state) {
  return state;
};



class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView : "assos"
    };
  }

  _toggleSwitch(value) {
    this.setState({ currentView: value });
  }


  render() {
    console.log("****************** ADMIN ******************", this.state);
    var switchBut = (<SwitchButton
              options={[
                { label: "Association", value: "assos" },
              ]}
              fontSize={18}
              buttonColor={"#FF3333"}
            />)
    if (this.props.user.accountType===3){
      var switchBut = (        <SwitchButton
                onPress={(value) => this._toggleSwitch(value)}
                options={[
                  { label: "Association", value: "assos" },
                  { label: "Utilisateurs", value: "users" },
                ]}
                fontSize={18}
                buttonColor={"#FF3333"}
              />)
    }

var view
if (this.state.currentView==="users"){
  view = (<UsersAdmin/>)
} else {
  view = (<AssosAdmin asso={this.props.user.asso} accountType={this.props.user.accountType}/>)
}
      return (
        <View style={styles.mainContainer}>
        {switchBut}
        {view}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop:10
  }
});

export default connect(mapStateToProps)(Admin);
