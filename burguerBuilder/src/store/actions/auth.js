import * as actionsType from "./actionsType";
import axios from "axios";

const url1 =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbzG8D_zRwrq1IijPjZqZFeo3l13tMt4c";
const url2 =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbzG8D_zRwrq1IijPjZqZFeo3l13tMt4c";
export const authStart = () => {
  return {
    type: actionsType.AUTH_START,
  };
};
export const authSuccess = (idToken, userId) => {
  return {
    type: actionsType.AUTH_SUCCESS,
    idToken,
    userId,
  };
};
export const authFail = (err) => {
  return {
    type: actionsType.AUTH_FAIL,
    error: err,
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionsType.AUTH_LOGOUT,
  };
};

export const checkOutTime = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, time * 1000);
  };
};

export const auth = (email, password, isSingup) => {
  return (dispatch) => {
    dispatch(authStart());

    let url = isSingup ? url1 : url2;

    axios
      .post(url, { email, password, returnSecureToken: true })
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log(response);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkOutTime(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
export const setAuthRedirect = (path) => {
  return {
    type: actionsType.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expiredIn = new Date(localStorage.getItem("expirationDate"));
      if (expiredIn <= new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkOutTime((expiredIn.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
