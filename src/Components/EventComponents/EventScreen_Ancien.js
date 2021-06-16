import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import SwitchButton from "../SwitchButton";
import CalendarComponent from "./CalendarComponent";
import EventList from "./EventList";
import EventModal from "./EventModal";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";

const mapStateToProps = function (state) {
  return state;
};



class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "calendar",
      dateSelected: {},
      isModalVisible: false,
      displayedEvent: {},
      isLoading: true,
    };
  }

  _toggleSwitch(value) {
    this.setState({ currentView: value });
  }
  render() {
    var listHeader = "Tous les évents";
    const currentAsso = this.props.screen.currentAsso;
    const eventsList = this.props.events.eventsList;
    var eventsListFiltered = [];
    var assoList = this.props.assos.assoList;
    if (currentAsso === "Accueil") {
      eventsListFiltered = eventsList;
    } else {
      listHeader = "Events " + currentAsso;
      eventsList.forEach(function (event) {
        const assosList = event.asso;
        assosList.forEach(function (asso) {
          if (asso === currentAsso) {
            eventsListFiltered.push(event);
          }
        });
      });
    }
    console.log("****************** EVENTSCREEN ******************");
    var displayedView;
    if (this.state.currentView === "calendar") {
      displayedView = (
        <CalendarComponent
          eventsList={eventsListFiltered}
          accountType={this.props.user.accountType}
          assoUser={this.props.user.asso}
        />
      );
    } else {
      displayedView = (
        <EventList
          eventsList={eventsListFiltered}
          accountType={this.props.user.accountType}
          assoUser={this.props.user.asso}
          listHeader={listHeader}
          assoList={assoList}
        />
      );
    }

    return (
      <View style={styles.mainContainer}>
        <UpdateReduxDataComponent dataToUpdate={"events"} />
        <View style={styles.body}>
          <View style={{ marginBottom: 10 }}>
            <SwitchButton
              onPress={(value) => this._toggleSwitch(value)}
              options={[
                { label: "Calendrier", value: "calendar" },
                { label: "Liste", value: "list" },
              ]}
              fontSize={18}
              buttonColor={"#FF3333"}
            />
          </View>
          {displayedView}
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 20,
  },
};

export default connect(mapStateToProps)(EventScreen);
