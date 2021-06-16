import React from "react";
import { View, StyleSheet } from "react-native";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import { withNavigation } from "react-navigation";

import EventModal from "./EventModal.js";
import AlertCard from "_Components/AlertCard";
import * as syst from "_root/systemFunctions";

LocaleConfig.locales["fr"] = {
  monthNames: syst.monthNames,
  monthNamesShort: syst.monthNamesShort,
  dayNames: syst.dayNames,
  dayNamesShort: syst.dayNamesShort,
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: {},
      isModalVisible: false,
      displayedEvent: {},
      isLoading: true,
    };
    props.navigation.addListener("willFocus", () => {
      this.setState({ isLoading: true });
    });

    // Fires after transition is complete
    props.navigation.addListener("didFocus", () => {
      this.setState({ isLoading: false });
    });
  }

  // Reprend les dates des événements de eventList et les transmet dans le Calendar
  _markEvents(events) {
    var mark;
    const length = events.length;
    for (let i = 0; i < length; i++) {
      mark = {
        ...mark,
        [syst.convertToDate(events[i].time)]: { marked: true },
      };
    }
    //console.log("Marked date =");
    //console.log(mark);
    return mark;
  }
  //fais la liste des dates pour lesquelles il y a des évents
  _listEventsDate(events) {
    var eventsDate = [];
    const length = events.length;
    for (let i = 0; i < length; i++) {
      eventsDate.push(syst.convertToDate(events[i].time));
    }
    //console.log("Event List =");
    //console.log(eventsDate);
    return eventsDate;
  }

  //Affiche le modal si il y a un évent ce jour là
  //Met en state l'événement qu'il y a ce jour là
  _datePressed(day) {
    var displayModal;
    var list = this._listEventsDate(this.props.eventsList);
    this.setState({ dateSelected: day });
    list.forEach(function (date) {
      if (day.dateString === date) {
        displayModal = true;
      }
    });
    if (displayModal === true) {
      this.setState(
        {
          displayedEvent: this.props.eventsList.filter(
            (event) => syst.convertToDate(event.time) === day.dateString
          )[0],
        }
        //console.log("test"),
        //console.log(this.state.displayedEvent)
      );

      this.toggleModal();
    }
  }

  //affiche le modal ou enlève le modal
  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    console.log("****************** CALENDARCOMPONENT ******************");
    return (
      <View style={styles.body}>
        <EventModal
          isVisible={this.state.isModalVisible}
          toggle={() => this.toggleModal()}
          date={this.state.dateSelected}
          event={this.state.displayedEvent}
        />
        {/*<CalendarList
          onDayPress={(day) => this._datePressed(day)}
          markedDates={this._markEvents(this.props.eventsList)}
          minDate={"2020-09-01"}
          maxDate={"2021-01-01"}
          pastScrollRange={1}
          futureScrollRange={4}
          theme={{
            todayTextColor: "#FF3333",
            dotColor: "#FF3333",
            textMonthFontSize: 18,
            textDayFontFamily: "Lato-Medium",
            textMonthFontFamily: "Lato-Semibold",
            textDayHeaderFontFamily: "Lato-Light",
          }}
        />*/}
        <View style={{height:135}}>
        <AlertCard />
        </View>
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 6,
    flexDirection: "column",
    alignItems: "center",
  },
};

export default withNavigation(CalendarComponent);
