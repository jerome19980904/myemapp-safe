import * as types from "./ActionsTypes";
import * as fb from "../../firebase";
import {cachedImage} from "../../Components/CacheImage";

export const refreshEventsRequest = () => ({
  type: types.REFRESH_EVENTS_REQUEST,
  loading: true
});

export const refreshEventsSuccess = (events, nbEvents, lastUp) => ({
  type: types.REFRESH_EVENTS_SUCCESS,
  events,
  nbEvents,
  lastUp,
  loading: false
});

export const refreshEventsError = error => ({
  type: types.REFRESH_EVENTS_ERROR,
  error,
  loading: false
});

export const fetchEvents = () => {
  return dispatch => {
    dispatch(refreshEventsRequest());

    fb.getData("events")
      .then(function(querySnapshot) {
        var events = [];
        var nbEvents = 0;
        var lastUp = "";
        var length = querySnapshot.size - 1;
        querySnapshot.forEach(async function(doc) {
          data = doc.data();
          if (doc.id === "***Last Update***") {
            lastUp = data.time;
          } else {
            nbEvents = nbEvents + 1;
            events.push({
              id: doc.id,
              asso: data.asso,
              name: data.name,
              details: data.details,
              time: data.time.seconds,
              price: data.price,
              fblink: data.fblink,
              sglink: data.sglink,
              place: data.place,
              categories: data.categories,
              img: await fb.getURLImage("Cover-events", doc.id)
            });
            if (events.length === length) {
              dispatch(refreshEventsSuccess(events, nbEvents, lastUp.seconds));
            }
          }
        });
      })
      .catch(error => {
        console.log(error);
        dispatch(refreshEventsError(error));
      });
  };
};
