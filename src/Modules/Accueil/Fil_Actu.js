import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";

import * as fb from "_root/firebase";
import * as notif from "_root/Notifications.js"

import CarouselComponent from "_Components/CarouselComponent";
import EventCard from "_Components/EventComponents/EventCard";
import PromotedCard from "_Components/EventComponents/PromotedCard";
import AlertCard from "_Components/AlertCard";

import EventModal from "_Components/EventComponents/EventModal";
import EventList from "_Components/EventComponents/EventList";
import LoadingComponent from "_Components/LoadingComponent";

import textStyles from "_styles/textStyles";
import * as types from "_Store/Actions/ActionsTypes";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";



const mapStateToProps = function (state) {
  return state;
};

var alertSeen = false;

class Fil_Actu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: {},
      isModalVisible: false,
      displayedEvent: {},
      activeSlide: 0,
    };
  }

  onPromotedPressed(data) {
    let eventsList = this.props.events.eventsList;

    //Navigue jusqu'à data.actionTarget et change le nom du currentScreen dans Redux
    if (data.action === "navigation") {
      let targetAsso = data.actionTarget.split("-")[0];
      const action = {
        type: types.TOGGLE_ASSO,
        value: targetAsso,
      };
      this.props.dispatch(action);
      this.props.navigation.navigate(data.actionTarget);
    } else if (data.action === "openModal") {
      let displayedEvent = eventsList.filter(
        (item) => item.id === data.actionTarget
      );
      this._eventPressed(displayedEvent[0]);
    }
  }

  _eventPressed(selectedEvent) {
    this.setState({
      displayedEvent: selectedEvent,
    });
    this.toggleModal();
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  //Fonction qui lance une alerte à l'utilisateur une seule fois
  _alertUser() {
    if (alertSeen === false) {
      Alert.alert(
        "En chantier ",
        "Si tu es sur cette écran, c'est que tu es étudiant à l'emlyon. Merci beaucoup de ton attention pour l'application, ça nous fait très plaisir. Pour le moment, l'application myEMapp est encore en chantier, donc rien de ce que tu vois ici n'est définitif."
      );
      alertSeen = true;
    }
  }



  componentDidMount() {
    notif.registerForPushNotifications();
    //this._alertUser();
  }

  render() {
    console.log("****************** FIL ACTU ******************");
    let promotedData = this.props.promoted.promoted;
    if (
      this.props.events.loading ||
      this.props.screen.updateCheckLoading ||
      this.props.user.loading ||
      this.props.promoted.loading
    ) {
      return (
        <LoadingComponent
          logoStyle={styles.logo}
          logoVisible={true}
          size={"large"}
          color={"#FF3333"}
        />
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.mainContainer}>
            <UpdateReduxDataComponent dataToUpdate={"all"} />
            <EventModal
              isVisible={this.state.isModalVisible}
              toggle={() => this.toggleModal()}
              date={this.state.dateSelect}
              event={this.state.displayedEvent}
            />
            <View style={styles.textContainer}>
              <Text style={[textStyles.h2]}>À la une</Text>
            </View>
            <CarouselComponent
              style={styles.carousel}
              data={promotedData}
              activeSlide={this.state.activeSlide}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
              renderItem={({ item }) => (
                <PromotedCard
                  data={item}
                  onPress={() => this.onPromotedPressed(item)}
                />
              )}
            />
            <Text style={[textStyles.h2]}>Les événements</Text>

            <AlertCard />
            {/*
            <EventList
              eventsList={this.props.events.eventsList}
              accountType={this.props.user.accountType}
              assoUser={this.props.user.asso}
              listHeader={"Tous les évents"}
              assoList={this.props.assos.assoList}
            />
            */}
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },
  mainContainer: {
    justifyContent: "flex-start",
    flex: 1,
    paddingHorizontal: 10,
  },

  textContainer: {
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 10,
  },
  carousel: {
    marginBottom: 18,
  },
});

export default connect(mapStateToProps)(Fil_Actu);
