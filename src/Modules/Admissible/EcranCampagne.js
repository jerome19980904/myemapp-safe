import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Timeline from "react-native-timeline-flatlist";

import SwitchButton from "_Components/SwitchButton";
import AssosCard from "./Campagnes/AssosCard";
import AssosTab from "./Campagnes/AssosTab";
import TimelineTab from "./Campagnes/TimelineTab";
import CampagnesTab from "./Campagnes/CampagnesTab";

class EcranCampagne extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "associations",
    };
  }

  _toogleSwitch(value) {
    this.setState({ currentView: value });
  }

  render() {
    var displayedView;
    if (this.state.currentView === "associations") {
      displayedView = <AssosTab />;
    } else if (this.state.currentView === "déroulement") {
      displayedView = <TimelineTab />;
    } else {
      displayedView = <CampagnesTab />;
    }
    return (
      <View style={styles.main_container}>
        <SwitchButton
          onPress={(value) => this._toogleSwitch(value)}
          options={[
            { label: "Associations", value: "associations" },
            { label: "Campagnes", value: "campagnes" },
            { label: "Déroulement", value: "déroulement" },
          ]}
          fontSize={18}
          buttonColor={"#FF3333"}
        />

        {displayedView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 15,
    marginTop: 10,
  },
});

export default EcranCampagne;
