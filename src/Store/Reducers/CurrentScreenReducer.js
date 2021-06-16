const initialState = {
  currentAsso: "Accueil",
  previousAsso: "",
  updateCheckLoading: false,
  updateCheck: false,
  lastUpdateEvents: 0,
  lastUpdateAssos: 0,
  lastUpdatePromoted: 0,
  lastUpdateAdmissible: 0
};
import * as types from "../Actions/ActionsTypes";

function currentScreen(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case types.TOGGLE_ASSO:
      nextState = {
        ...state,
        currentAsso: action.value
      };
      return nextState || state;

    case types.TOGGLE_HEADER_BUTTON:
      nextState = {
        ...state,
        currentAsso: action.newAsso,
        previousAsso: action.currentAsso
      };
      return nextState || state;

    case types.UPDATE_FORCED_EVENTS:
      nextState = {
        ...state,
        lastUpdateEvents: 0
      };
      return nextState || state;

    case types.UPDATE_CHECK_REQUEST:
      nextState = {
        ...state,
        updateCheckLoading: action.updateCheckLoading
      };
      return nextState || state;
    case types.UPDATE_CHECK_SUCCESS:
      nextState = {
        ...state,
        updateCheckLoading: action.updateCheckLoading,
        updateCheck: action.updateCheck,
        lastUpdateAssos: action.lastUpdateAssos,
        lastUpdateEvents: action.lastUpdateEvents,
        lastUpdatePromoted: action.lastUpdatePromoted,
        lastUpdateAdmissible: action.lastUpdateAdmissible
      };
      return nextState || state;
    case types.UPDATE_CHECK_ERROR:
      nextState = {
        ...state,
        updateCheckLoading: action.updateCheckLoading,
        updateCheck: action.updateCheck,
        error: action.error
      };
    default:
      return state;
  }
}

export default currentScreen;

/*
Pour récupérer la donnée currentAsso dans un component il faut :
I - Configurations nécessaires
  1. Copier ces lignes de code au début du component:
  import {connect} from 'react-redux'
  import * as types from '......./Actions/ActionsTypes'
  const mapStateToProps = function(state) {
    return state;
  };

  2. Remplacer l'export default à la fin par :
  export default connect(mapStateToProps)(Nom_Component);

II - Comment changer le nom de la currentAsso

1. Mettre la fonction suivante dans le component (c'est la fonction qui va permettre de changer le nom de la currentAsso):
function _toggleCurrentAsso(){
  const action = {type : types.TOGGLE_ASSO, value : "Nouvelle asso de l'écran"}
  this.props.dispatch(action)
}

2. Appeler la fonction _toggleCurrentAsso() dans le component

III - Comment récupérer le nom de la currentAsso


On la récupère avec la commande :
this.props.screen.currentAsso
*/
