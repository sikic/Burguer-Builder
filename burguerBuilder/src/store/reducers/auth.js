import * as actionTypes from "../actions/actionsType";
import { updateObject } from "../utils";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: "/",
};

const authStart = (state, action) => {
  return updateObject(...state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(...state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(...state, { error: action.error, loading: false });
};

const authLogOut = (state, action) => {
  return updateObject(...state, {
    tokem: null,
    userId: null,
  });
};

const setAuthRedirect = (state, action) => {
  return updateObject(...state, { authRedirect: action.path });
};
export const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogOut(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirect(state, action);
    default:
      return state;
  }
};
