import { combineReducers } from "redux";
import refreshEvents from "./EventsReducer";
import refreshAdmissible from "./AdmissibleReducer";
import refreshPromoted from "./PromotedReducer";
import currentScreen from "./CurrentScreenReducer";
import getAssosData from "./AssosDataReducer";
import getUserData from "./UserDataReducer";
import { persistCombineReducers, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "events", "admissible"],
  blacklist: ["screen", "assos"],
  stateReconcilier: autoMergeLevel1,
};

const eventsPersistConfig = {
  key: "events",
  storage: AsyncStorage,
  blacklist: ["loading"],
};
const eventsPersistReducer = persistReducer(eventsPersistConfig, refreshEvents);

const assosPersistConfig = {
  key: "assos",
  storage: AsyncStorage,
  blacklist: ["loading"],
};

const assosPersistReducer = persistReducer(assosPersistConfig, getAssosData);

const rootReducer = persistCombineReducers(rootPersistConfig, {
  events: eventsPersistReducer,
  screen: currentScreen,
  assos: assosPersistReducer,
  user: getUserData,
  promoted: refreshPromoted,
  admissible: refreshAdmissible,
});

//const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
export default rootReducer;
