import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Store from "./ConfigureStore";
import * as types from "./Actions/ActionsTypes";
import * as EventsActions from "./Actions/EventsActions";
import * as PromotedActions from "./Actions/PromotedActions";
import * as ScreenActions from "./Actions/CurrentScreenActions";
import * as UserActions from "./Actions/UserDataActions";
import * as AssosActions from "./Actions/AssosDataActions";
import * as AdmissibleActions from "./Actions/AdmissibleActions";
import "firebase/app";
import "firebase/auth";

const mapStateToProps = function (state) {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  EventsActions: bindActionCreators(EventsActions, dispatch),
  ScreenActions: bindActionCreators(ScreenActions, dispatch),
  UserActions: bindActionCreators(UserActions, dispatch),
  AssosActions: bindActionCreators(AssosActions, dispatch),
  PromotedActions: bindActionCreators(PromotedActions, dispatch),
  AdmissibleActions: bindActionCreators(AdmissibleActions, dispatch),
});

class UpdateReduxDataComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(
      "****************** UPDATE REDUX DATA COMPONENT - Updating : " +
        this.props.dataToUpdate +
        " ******************"
    );

    if (
      this.props.dataToUpdate === "user" ||
      this.props.dataToUpdate === "all"
    ) {
      if (
        !this.props.user.loading &&
        (this.props.user.userID === "" || this.props.forceUpdate)
      ) {
        Store.dispatch(this.props.UserActions.fetchUserData);
      }
    }

    if (
      this.props.dataToUpdate === "check" ||
      this.props.dataToUpdate === "all"
    ) {
      if (
        !this.props.screen.updateCheck &&
        !this.props.screen.updateCheckLoading
      ) {
        Store.dispatch(this.props.ScreenActions.fetchUpdateCheck);
      }
    }

    if (
      this.props.dataToUpdate === "events" ||
      this.props.dataToUpdate === "all"
    ) {
      if (
        this.props.events.lastUpdate < this.props.screen.lastUpdateEvents &&
        !this.props.events.loading
      ) {
        Store.dispatch(this.props.EventsActions.fetchEvents);
      }
    }

    if (this.props.dataToUpdate === "admissible") {
      if (
        !this.props.admissible.loading &&
        this.props.admissible.lastUpdate === 0
      ) {
        Store.dispatch(this.props.AdmissibleActions.fetchAdmissible);
      }
    }

    if (
      this.props.dataToUpdate === "assos" ||
      this.props.dataToUpdate === "all"
    ) {
      if (
        this.props.assos.lastUpdate < this.props.screen.lastUpdateAssos &&
        !this.props.assos.loading
      ) {
        Store.dispatch(this.props.AssosActions.fetchAssosData);
      }
    }

    if (
      this.props.dataToUpdate === "promoted" ||
      this.props.dataToUpdate === "all"
    ) {
      if (
        this.props.promoted.lastUpdate < this.props.screen.lastUpdatePromoted &&
        !this.props.promoted.loading
      ) {
        Store.dispatch(this.props.PromotedActions.fetchPromoted);
      }
    }

    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateReduxDataComponent);
