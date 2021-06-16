const initialState = {
  assosData: [],
  loading: false,
  nb: 0,
  lastUpdate: 0,
  haveToUpdate: false,
  nbCatched: 0,
  assoList: [],
};
import * as types from "../Actions/ActionsTypes";

function getAssosData(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case types.GET_ASSOS_DATA_REQUEST:
      nextState = {
        ...state,
        loading: action.loading,
        haveToUpdate: action.haveToUpdate,
      };
      return nextState;

    case types.GET_ASSOS_DATA_SUCCESS:
      nextState = {
        ...state,
        loading: action.loading,
        assosData: action.data,
        nb: action.nbAssos,
        lastUpdate: action.lastUp,
        nbCatched: action.nbCatched,
        assoList: action.assoList,
      };
      return nextState;

    case types.GET_ASSOS_DATA_ERROR:
      nextState = {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    case types.TOGGLE_HAVE_TO_UPDATE_ASSOS:
      nextState = {
        ...state,
        haveToUpdate: !state.haveToUpdate,
      };

    default:
      return state;
  }
}

export default getAssosData;
