import React, {Component} from "react";
import {Text, View, StyleSheet, FlatList, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectionedMultiSelect from "react-native-sectioned-multi-select";
import {connect} from "react-redux";

import EventCard from "./EventCard";
import EventModal from "./EventModal";
import EventModalEdition from "./EventModalEdition";
import SwitchButton from "_Components/SwitchButton";
import LongButton from "_Components/LongButton";
import UpdateReduxDataComponent from "_Store/UpdateReduxDataComponent";
import FilterComponent from "_Components/FilterComponent"
import AlertCard from "_Components/AlertCard";
import * as types from "_Store/Actions/ActionsTypes";
import textStyles from "_styles/textStyles";

const mapStateToProps = function(state) {
  return state;
};
const eventCategories = [{objet:"Sport", display:"Sport" },{objet:"Soirée", display:"Soirée" }, {objet:"Apéro", display:"Apéro" }, {objet:"Son", display:"Son" }, {objet:"Art", display:"Art" }, {objet:"Danse", display:"Danse" }, {objet:"Séjour", display:"Séjour" }, {objet:"Appartement", display:"Appartement" }, {objet:"Jeux", display:"Jeux" }, {objet:"Conférence", display:"Conférence" }, {objet:"Interview", display:"Interview" },{objet:"Sérieux", display:"Sérieux" },{objet:"Cours", display:"Cours" },{objet:"Dégustation", display:"Dégustation" },{objet:"Repas", display:"Repas" },{objet:"Débat", display:"Débat" }]
const filtreCategories=[{objet:"Aucun Filtre", display:"Aucun Filtre"},{objet:"categories", display:"Catégories", children:eventCategories},{objet:"name", display:"Nom"},{objet:"asso", display:"Association"}]
const filtresWithoutInput=["Soirée", "Sport", "Apéro", "Son", "Art", "Danse", "Séjour", "Appartement", "Jeux", "Conférence", "Interview", "Sérieux", "Cours", "Dégustation", "Repas", "Débat"]


class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSelected: {},
      newEvent: false,
      isModalVisible: false,
      displayedEvent: {},
      editionMode: false,
      update:"",
      eventsFiltered:this.props.eventsList
    };
  }

  _toggleEditionMode(value) {
    this.setState({editionMode: value});
  }
  _eventPressed(selectedEvent) {
    this.setState({displayedEvent: selectedEvent});
    this.toggleModal();
  }

  toggleModal() {
    if (this.state.newEvent && this.state.isModalVisible) {
      this.setState({
        isModalVisible: !this.state.isModalVisible,
        newEvent: false
      });
    } else {
      this.setState({
        isModalVisible: !this.state.isModalVisible
      });
    }
  }
_filtrerEvents = (data) => {
  this.setState({eventsFiltered:data})
}
  render() {
    console.log("****************** EVENTLIST ******************");
    var eventsListFiltered = this.props.eventsList
    var addEvent;
    var eventModal = (
      <EventModal
        isVisible={this.state.isModalVisible}
        toggle={() => this.toggleModal()}
        date={this.state.dateSelected}
        event={this.state.displayedEvent}
        assoUser={this.props.user.asso}
        accountType={this.props.user.accountType}
      />
    );
    if (this.state.editionMode) {
      console.log("Edition Mode");
      addEvent = (
        <LongButton
          style={styles.button}
          onPress={() => {
            this.setState({
              newEvent: true,
              displayedEvent: {
                name: "Nom évènement",
                time: new Date() / 1000,
                place: "",
                asso: [],
                details:
                  "C'est là où vous devez mettre la description de l'évènement",
                price: 0,
                fb: "",
                sg: "",
                img: " ",
                categories: []
              }
            });
            this.toggleModal();
          }}
          title="Ajouter un évent"
        />
      );
      eventModal = (
        <EventModalEdition
          isVisible={this.state.isModalVisible}
          toggle={() => this.toggleModal()}
          date={this.state.dateSelected}
          event={this.state.displayedEvent}
          assoUser={this.props.user.asso}
          new={this.state.newEvent}
          assoList={this.props.assos.assoList}
        />
      );
    }

    var editionButton;
    if (this.props.accountType > 0) {
      editionButton = (
        <View style={{ height: 50 }}>
          <SwitchButton
            onPress={(value) => this._toggleEditionMode(value)}
            style={{ marginVertical: 8 }}
            options={[
              {
                value: false,
                customIcon: <Icon name="glasses" size={20} color="grey" />,
              },
              {
                value: true,
                customIcon: (
                  <Icon name="pencil-outline" size={20} color="grey" />
                ),
              },
            ]}
            height={25}
            fontSize={12}
            buttonColor={"black"}
          />
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View style={{}}>
          <Text style={[textStyles.h3, styles.list]}>
            {this.props.listHeader}
          </Text>
          {editionButton}
        </View>
        {eventModal}
        <ScrollView>
{/*<FilterComponent data={this.props.eventsList} filtreCategories={filtreCategories} onceFiltered={this._filtrerEvents} sectioned={true} filtresWithoutInput={filtresWithoutInput}/>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {addEvent}
          </View>

          <FlatList
            data={this.state.eventsFiltered}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 8, marginRight: 5, marginLeft: 5 }}>
                <EventCard
                  event={item}
                  onPress={() => this._eventPressed(item)}
                  edition={this.state.editionMode}
                />
              </View>
            )}
            overScrollMode="always"
            keyExtractor={(item) => item.id}
          />*/}
          <AlertCard />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 6
  },
  list: {
    fontSize: 22
  },
  button: {
    marginBottom: 15
  }
});

export default connect(mapStateToProps)(EventList);
