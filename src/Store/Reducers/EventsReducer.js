const initialState = {
  eventsList: [],
  loading: false,
  nb: 0,
  lastUpdate: 0,
};
import * as types from "../Actions/ActionsTypes";

function refreshEvents(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case types.REFRESH_EVENTS_REQUEST:
      nextState = {
        ...state,
        loading: action.loading,
      };
      return nextState;

    case types.REFRESH_EVENTS_SUCCESS:
      nextState = {
        ...state,
        loading: action.loading,
        eventsList: action.events,
        nb: action.nbEvents,
        lastUpdate: action.lastUp,
      };
      return nextState;

    case types.REFRESH_EVENTS_ERROR:
      nextState = {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    default:
      return state;
  }
}

export default refreshEvents;
