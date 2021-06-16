import * as types from "./ActionsTypes";
import * as fb from "../../firebase";
import "firebase/auth";
import { cachedImage } from "../../Components/CacheImage";

export const refreshPromotedRequest = () => ({
  type: types.REFRESH_PROMOTED_REQUEST,
  loading: true,
});

export const refreshPromotedSuccess = (promoted, lastUp) => ({
  type: types.REFRESH_PROMOTED_SUCCESS,
  promoted,
  lastUp,
  loading: false,
});

export const refreshPromotedError = (error) => ({
  type: types.REFRESH_PROMOTED_ERROR,
  error,
  loading: false,
});

export const fetchPromoted = () => {
  return (dispatch) => {
    dispatch(refreshPromotedRequest());

    fb.getData("promoted")
      .then(function (querySnapshot) {
        var promoted = [];
        var lastUp = "";
        var length = querySnapshot.size - 1;
        querySnapshot.forEach(async function (doc) {
          data = doc.data();
          if (doc.id === "***Last Update***") {
            lastUp = data.time;
          } else {
            promoted.push({
              asso: data.asso,
              title: data.title,
              subtitle: data.subtitle,
              action: data.action,
              actionTarget: data.actionTarget,
              imgPath: data.imgPath,
            });
            if (promoted.length === length) {
              dispatch(refreshPromotedSuccess(promoted, lastUp.seconds));
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(refreshPromotedError(error));
      });
  };
};
