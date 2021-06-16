import * as types from "./ActionsTypes";
import * as fb from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

export const getUserDataRequest = () => ({
  type: types.GET_USER_DATA_REQUEST,
  loading: true,
});

export const getUserDataSuccess = (
  userID,
  asso,
  accountType,
  mail,
  signUpDate,
  firstName,
  lastName
) => ({
  type: types.GET_USER_DATA_SUCCESS,
  userID: userID,
  asso: asso,
  accountType: accountType,
  mail: mail,
  loading: false,
  signUpDate: signUpDate,
  firstName: firstName,
  lastName: lastName,
});

export const getUserDataError = (error) => ({
  type: types.GET_USER_DATA_ERROR,
  error,
  loading: false,
});

export const fetchUserData = () => {
  return (dispatch) => {
    dispatch(getUserDataRequest());

    fb.getDataDoc("usersData", firebase.auth().currentUser.uid)
      .then(function (document) {
        var doc = document.data();
        dispatch(
          getUserDataSuccess(
            doc.userID,
            doc.asso,
            doc.accountType,
            doc.mail,
            doc.signUpDate.seconds,
            doc.lastName,
            doc.firstName
          )
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(getUserDataError(error));
      });
  };
};
