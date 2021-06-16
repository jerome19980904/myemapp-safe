const initialState = {
  userID: "",
  userPhoto: "",
  mail: "",
  asso: "None",
  accountType: 0 /* 0= compte normal, 1=admin de l'asso, 2=superadmin (corpo,...), 3=Grand Manitout (maintenance, pnp,...) */,
  loading: false,
  signUpDate: 0,
  firstName: "",
  lastName: ""
};
import * as types from "../Actions/ActionsTypes";

function getUserData(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case types.GET_USER_DATA_REQUEST:
      nextState = {
        ...state,
        loading: action.loading
      };
      return nextState;

    case types.GET_USER_DATA_SUCCESS:
      nextState = {
        ...state,
        userID: action.userID,
        userPhoto: action.userPhoto,

        asso: action.asso,
        accountType: action.accountType,
        mail: action.mail,
        loading: action.loading,
        signUpDate: action.signUpDate,
        firstName: action.firstName,
        lastName: action.lastName,
        notificationsList: action.notificationsList,
        expoNotificationToken : action.expoNotificationToken
      };
      return nextState;

    case types.GET_USER_DATA_ERROR:
      nextState = {
        ...state,
        loading: action.loading,
        error: action.error
      };

    case types.TOGGLE_USER_PHOTO:
      nextState = {
        ...state,
        userPhoto: action.value
      };
      return nextState;

    default:
      return state;
  }
}

export default getUserData;
