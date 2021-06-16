const initialState = {
  eventsList: [],
  loading: false,
  categories: [],
  lastUpdate: 0,
};
import * as types from "../Actions/ActionsTypes";

function refreshAdmissible(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case types.REFRESH_ADMISSIBLE_REQUEST:
      nextState = {
        ...state,
        loading: action.loading,
      };
      return nextState;

    case types.REFRESH_ADMISSIBLE_SUCCESS:
      nextState = {
        ...state,
        loading: action.loading,
        eventsList: action.events,
        categories: action.categories,
        lastUpdate: action.lastUp,
      };
      return nextState;

    case types.REFRESH_ADMISSIBLE_ERROR:
      nextState = {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    default:
      return state;
  }
}

export default refreshAdmissible;
