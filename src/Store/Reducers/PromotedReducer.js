const initialState = {
  promoted: [],
  loading: false,
  lastUpdate: 0
};
import * as types from "../Actions/ActionsTypes";

function refreshPromoted(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case types.REFRESH_PROMOTED_REQUEST:
      nextState = {
        ...state,
        loading: action.loading
      };
      return nextState;

    case types.REFRESH_PROMOTED_SUCCESS:
      nextState = {
        ...state,
        loading: action.loading,
        promoted: action.promoted,
        lastUpdate: action.lastUp
      };
      return nextState;

    case types.REFRESH_PROMOTED_ERROR:
      nextState = {
        ...state,
        loading: action.loading,
        error: action.error
      };

    case types.TOGGLE_HAVE_TO_UPDATE_EVENTS:
      nextState = {
        ...state,
        haveToUpdate: !state.haveToUpdate
      };

    default:
      return state;
  }
}

export default refreshPromoted;
