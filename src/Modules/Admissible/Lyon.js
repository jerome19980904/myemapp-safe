import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import LyonArticles from "./LyonComponents/LyonArticles";
import SwitchButton from "_Components/SwitchButton";
import LyonCollapsed from "./LyonComponents/LyonCollapsed.js";
import LyonLogement from "./LyonComponents/LyonLogement";
import CacheImage from "_Components/CacheImage";
import data1 from "./LyonComponents/LyonCoordinatesData.js";
import data from "./LyonComponents/LyonData.js";


class Lyon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "culture",
      dateSelected: {},
      isModalVisible: false,
      displayedEvent: {},
      isLoading: true,
    };
    console.log("************************ DATA LYON1 ************************");
    console.log(data1[0]);
  }
  _triCtg(ctg) {
    var dataTriee = [];
    data.forEach((item) => {
      if (item.id === ctg) {
        dataTriee.push(item);
      }
    });
    return dataTriee;
  }

  _toogleSwitch(value) {
    this.setState({ currentView: value });
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    var displayedView;
    var ctg;
    ctg = data.catégorie;
    if (this.state.currentView === "culture") {
      displayedView = (
        <ScrollView showsVerticalScrollIndicator={false}>
          <LyonArticles />
          <View style={{ height: 160 }}>
            <CacheImage
              style={{ height: 120 }}
              resizeMode={"contain"}
              firebaseFileName={"Petit Paumé.png"}
              firebaseFolder={"Logo-asso"}
            />
          </View>
        </ScrollView>
      );
    } else if (this.state.currentView === "logement") {
      displayedView = <LyonLogement />;
    } else if (this.state.currentView === "list") {
      displayedView = <LyonFlatlist />;
    } else {
      displayedView = <LyonCollapsed />;
    }

    return (
      <View style={styles.main_container}>
        <SwitchButton
          onPress={(value) => this._toogleSwitch(value)}
          options={[
            { label: "Culture", value: "culture" },
            { label: "Bons plans", value: "infos" },
            { label: "Logement", value: "logement" },
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
    marginTop: 10,
  },
});

export default Lyon;
