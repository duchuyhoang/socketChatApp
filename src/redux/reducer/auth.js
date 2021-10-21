import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import { parseJwt } from '../../common/functions';
const { Types, Creators } = createActions({
  loginRequest: ['payload'],
  loginSucceed: ['payload'],
  loginFailed: ['payload'],
  relogin: ['payload'],
  reloginSucceed: ['payload'],
  setConversationSocketReady: ['payload'],
  setNotificationSocketReady: ['payload'],
  setUserSocketReady: ['payload'],
});

export const AUTH_INITIAL_STATE = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  socketReadyFlags: {
    conversation: false,
    notification: false,
    user: false,
  },
};

//selector
const selectSelf = (state) => state.auth;
export const selectAccessToken = createSelector(
  selectSelf,
  (state) => state.accessToken
);
const selectAllSocketFlags = createSelector(
  selectSelf,
  (state) => state.socketReadyFlags
);

export const selectAuthError = createSelector(
  selectSelf,
  (state) => state.error
);

//Action
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
    error: null,
    accessToken: payload.accessToken,
  };
};

const setConversationSocketReady = (state) => {
  return {
    ...state,
    socketReadyFlags: { ...state.socketReadyFlags, conversation: true },
  };
};
const setNotificationSocketReady = (state) => {
  return {
    ...state,
    socketReadyFlags: { ...state.socketReadyFlags, notification: true },
  };
};
const setUserSocketReady = (state) => {
  return {
    ...state,
    socketReadyFlags: { ...state.socketReadyFlags, user: true },
  };
};

export const AuthTypes = Types;
export const AuthActions = Creators;

export const selectIsLogin = createSelector(
  selectAccessToken,
  (accessToken) => {
    if (accessToken) {
      const parsedToken = parseJwt(accessToken);
      const now = Date.now();
      return parsedToken.exp * 1000 > now ? true : false;
    } else return false;
  }
);

export const selectSocketConnectionSuccess = createSelector(
  selectAllSocketFlags,
  (socketFlags) => {
    const socketList = { ...socketFlags };
    Object.keys(socketFlags).map((key) => {
      if (!socketList[key]) delete socketList[key];
    });
    return Object.keys(socketFlags).length === Object.keys(socketFlags).length;
  }
);

export const AuthReducer = createReducer(AUTH_INITIAL_STATE, {
  [AuthTypes.LOGIN_SUCCEED]: handleLoginSucceed,
  [AuthTypes.LOGIN_FAILED]: handleLoginFailed,
  [AuthTypes.SET_CONVERSATION_SOCKET_READY]: setConversationSocketReady,
  [AuthTypes.SET_NOTIFICATION_SOCKET_READY]: setNotificationSocketReady,
  [AuthTypes.SET_USER_SOCKET_READY]: setUserSocketReady,
  [AuthTypes.RELOGIN_SUCCEED]: handleReloginSucceed,
});
