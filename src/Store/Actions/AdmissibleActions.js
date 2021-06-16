import * as types from "./ActionsTypes";
import * as fb from "../../firebase";

export const refreshAdmissibleRequest = () => ({
  type: types.REFRESH_ADMISSIBLE_REQUEST,
  loading: true,
});

export const refreshAdmissibleSuccess = (events, categories, lastUp) => ({
  type: types.REFRESH_ADMISSIBLE_SUCCESS,
  events,
  categories,
  lastUp,
  loading: false,
});

export const refreshAdmissibleError = (error) => ({
  type: types.REFRESH_ADMISSIBLE_ERROR,
  error,
  loading: false,
});

export const fetchAdmissible = () => {
  return (dispatch) => {
    dispatch(refreshAdmissibleRequest());

    fb.getData("admissible_events")
      .then(async function (querySnapshot) {
        var events = [];
        var categories = [];
        var categoriesList = [];
        var lastUp = "";
        var length = querySnapshot.size - 1;
        querySnapshot.forEach(async function (doc) {
          data = doc.data();
          if (doc.id === "***Last Update***") {
            lastUp = data.time;
          } else {
            if (categoriesList.indexOf(data.categorie) === -1) {
              categoriesList.push(data.categorie);
              categories.push({ id: data.categorie });
            }
            events.push({
              id: doc.id,
              asso: data.asso,
              name: data.name,
              details: data.details,
              participants: data.participants,
              site: data.site,
              fblink: data.fblink,
              categorie: data.categorie,
              img: await fb.getAllURLCached(
                "Admissible/events/" + doc.id,
                doc.id,
                ".jpg",
                ".png"
              ),
            });
            if (events.length === length) {
              dispatch(
                refreshAdmissibleSuccess(events, categories, lastUp.seconds)
              );
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(refreshAdmissibleError(error));
      });
  };
};
