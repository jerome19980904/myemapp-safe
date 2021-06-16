import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers/ARootReducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

const loggerMiddleware = createLogger();
const Store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default Store;
