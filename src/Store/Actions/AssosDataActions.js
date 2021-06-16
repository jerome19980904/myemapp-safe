import * as types from "./ActionsTypes";
import * as fb from "../../firebase";
import * as syst from "../../systemFunctions";

const logoPnP =
  "https://i1.wp.com/le-m-verbatem.fr/wp-content/uploads/2019/05/Logo-Plug_N_Play-2019.png?resize=1024%2C768";

export const getAssosDataRequest = () => ({
  type: types.GET_ASSOS_DATA_REQUEST,
  loading: true,
  haveToUpdate: false,
});

export const getAssosDataSuccess = (
  data,
  nbAssos,
  lastUp,
  nbCatched,
  assoList
) => ({
  type: types.GET_ASSOS_DATA_SUCCESS,
  data,
  nbAssos,
  lastUp,
  nbCatched,
  assoList,
  loading: false,
});

export const getAssosDataError = (error) => ({
  type: types.GET_ASSOS_DATA_ERROR,
  error,
  loading: false,
});

export const fetchAssosData = () => {
  return (dispatch) => {
    dispatch(getAssosDataRequest());

    fb.getData("associations")
      .then(function (collection) {
        var assosData = [];
        var nbCatched = 0;
        var nbAssos = 0;
        var lastUp = "";
        var length = collection.size - 1;
        var assoList = [];
        collection.forEach(async function (document) {
          var doc = document.data();
          if (document.id === "***Last Update***") {
            lastUp = doc.time;
          } else {
            var imgURL = "";
            await fb
              .getURL("Logo-asso", document.id + ".png")
              .then((res) => (imgURL = res))
              .catch((error) => (imgURL = logoPnP));
            nbAssos += 1;
            if (doc.catched) {
              nbCatched += 1;
            }
            assoList.push({ name: document.id });
            assosData.push({
              name: document.id,
              catched: doc.catched,
              details: doc.details,
              members: doc.members,
              navigatorName: doc.navigatorName,
              fullName: doc.fullName,
              img: imgURL,
            });
            if (assosData.length === length) {
              assosData.sort((a, b) =>
                a.catched < b.catched
                  ? 1
                  : a.catched === b.catched
                  ? a.name > b.name
                    ? 1
                    : -1
                  : -1
              );
              dispatch(
                getAssosDataSuccess(
                  assosData,
                  nbAssos,
                  lastUp.seconds,
                  nbCatched,
                  assoList
                )
              );
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(getAssosDataError(error));
      });
  };
};
