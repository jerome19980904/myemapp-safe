import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import SwitchButton from "_Components/SwitchButton";
import CalendarComponent from "_Components/EventComponents/CalendarComponent";
import EventList from "_Components/EventComponents/EventList";
import EventModal from "_Components/EventComponents/EventModal";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";
import textStyles from "_styles/textStyles";

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

  render() {
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

    displayedView = (
      <EventList
        eventsList={eventsListFiltered}
        accountType={this.props.user.accountType}
        assoUser={this.props.user.asso}
        assoList={assoList}
      />
    );

    return (
      <View style={styles.mainContainer}>
        <UpdateReduxDataComponent dataToUpdate={"events"} />
        <View style={styles.body}>
          <Text style={[textStyles.h3, styles.text]}>
            Retrouvez ici les événements associatifs de la semaine. Les
            événements sont mis à jour chaque week-end.
          </Text>
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
    marginTop: 10,
  },
};

export default connect(mapStateToProps)(EventScreen);
