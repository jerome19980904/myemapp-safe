import * as types from "./ActionsTypes";
import * as fb from "../../firebase";

export const updateCheckRequest = () => ({
  type: types.UPDATE_CHECK_REQUEST,
  updateCheckLoading: true,
});

export const updateCheckSuccess = (
  lastUpdateAssos,
  lastUpdateEvents,
  lastUpdatePromoted,
  lastUpdateAdmissible
) => ({
  type: types.UPDATE_CHECK_SUCCESS,
  lastUpdateAssos,
  lastUpdateEvents,
  lastUpdatePromoted,
  lastUpdateAdmissible,
  updateCheckLoading: false,
  updateCheck: true,
});

export const updateCheckError = (error) => ({
  type: types.UPDATE_CHECK_ERROR,
  error,
  updateCheckLoading: false,
  updateCheck: true,
});

export const fetchUpdateCheck = () => {
  return (dispatch) => {
    dispatch(updateCheckRequest());
    var lastUpdateAssos = 0;
    var lastUpdateEvents = 0;
    var lastUpdatePromoted;
    fb.getLastUpdateTime("associations").then(function (doc) {
      data = doc.data();
      lastUpdateAssos = data.time.seconds;
      fb.getLastUpdateTime("events").then(function (doc2) {
        data2 = doc2.data();
        lastUpdateEvents = data2.time.seconds;
        fb.getLastUpdateTime("promoted").then(function (doc3) {
          data3 = doc3.data();
          lastUpdatePromoted = data3.time.seconds;
          fb.getLastUpdateTime("admissible_events").then(function (doc4) {
            data4 = doc4.data();
            lastUpdateAdmissible = data4.time.seconds;
            dispatch(
              updateCheckSuccess(
                lastUpdateAssos,
                lastUpdateEvents,
                lastUpdatePromoted,
                lastUpdateAdmissible
              )
            );
          });
        });
      });
    });
  };
};
