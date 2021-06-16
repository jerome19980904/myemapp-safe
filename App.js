import React from "react";
import Navigation from "_Navigation/Navigation-Root";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import Store from "_Store/ConfigureStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

//Pour ne pas voir les erreurs jaunes pendant les phases de dev
//A retirer si on veut débugger / optimiser
console.disableYellowBox = true;
YellowBox.ignoreWarnings(["Remote debugger"]);
YellowBox.ignoreWarnings(["Setting a timer"]);

export default class App extends React.Component {
  componentdidMount() {}
  render() {
    let persiStore = persistStore(Store);
    persiStore.purge();
    return (
      <Provider store={Store}>
        <PersistGate persistor={persiStore}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
