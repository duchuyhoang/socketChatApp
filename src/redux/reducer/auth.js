import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import { parseJwt, setCookie, getCookie } from '../../common/functions';

const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSucceed: ['payload'],
  loginFailed: ['payload'],
  relogin: ['payload'],
  reloginSucceed: ['payload'],
  signOut: ['payload'],

  editUser: ['payload'],
  editUserSucceed: ['payload'],
  editUserFailed: ['payload'],
});

export const AUTH_INITIAL_STATE = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

//selector
const selectSelf = (state) => state.auth;

export const selectAccessToken = createSelector(
  selectSelf,
  (state) => state.accessToken
);

export const selectRefreshToken = createSelector(
  selectSelf,
  (state) => state.refreshToken
);

export const selectUser = createSelector(selectSelf, (state) => state.user);

export const selectAuthError = createSelector(
  selectSelf,
  (state) => state.error
);

export const selectIsLogin = createSelector(
  selectAccessToken,
  (accessToken) => {
    if (accessToken) {
      const parsedToken = parseJwt(accessToken);
      const now = Date.now();
      return parsedToken.exp * 1000 > now ? true : false;
    }
    return false;
  }
);

//reducer
const handleLoginSucceed = (state, { payload }) => {
  return {
    ...state,
    user: parseJwt(payload.accessToken),
    error: null,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  };
};

const handleLoginFailed = (state, { payload }) => {
  return {
    ...state,
    error:
      payload.status === 401
        ? 'Email hoặc mật khẩu không đúng!'
        : 'Connect failed!',
  };
};

const handleReloginSucceed = (state, { payload }) => {
  return {
    ...state,
    user: parseJwt(payload.accessToken),
    error: null,
    accessToken: payload.accessToken,
    refreshToken: getCookie('cn11_refresh_token'),
  };
};

const handleSignOut = (state) => {
  setCookie('cn11_refresh_token', null, 0);
  setCookie('cn11_access_token', null, 0);
  return {
    ...AUTH_INITIAL_STATE,
  };
};

const handleEditUserSucceed = (state, { payload }) => {
  return {
    ...state,
    error: null,
    user: payload.data,
  };
};
const handleEditUserFailed = (state) => {
  return {
    ...state,
    error: 'Some thing went wrong! Connect failed?',
  };
};

//socket

export const AuthTypes = Types;
export const AuthActions = Creators;

export const AuthReducer = createReducer(AUTH_INITIAL_STATE, {
  [AuthTypes.LOGIN_SUCCEED]: handleLoginSucceed,
  [AuthTypes.LOGIN_FAILED]: handleLoginFailed,
  [AuthTypes.RELOGIN_SUCCEED]: handleReloginSucceed,
  [AuthTypes.SIGN_OUT]: handleSignOut,
  [AuthTypes.EDIT_USER_SUCCEED]: handleEditUserSucceed,
  [AuthTypes.EDIT_USER_FAILED]: handleEditUserFailed,
});
