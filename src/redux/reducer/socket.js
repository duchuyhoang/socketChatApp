import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

export const SOCKET_INITIAL_STATE = {
  socketReadyFlags: {
    conversation: false,
    notification: false,
    user: false,
  },
};

const { Types, Creators } = createActions({
  setConversationSocketReady: ['payload'],
  setNotificationSocketReady: ['payload'],
  setUserSocketReady: ['payload'],
});

//selector
const selectSelf = (state) => state.socket;

const selectAllSocketFlags = createSelector(
  selectSelf,
  (state) => state.socketReadyFlags
);

export const selectSocketConnectionSuccess = createSelector(
  selectAllSocketFlags,
  (socketFlags) => {
    const socketList = { ...socketFlags };
    Object.keys(socketFlags).forEach((key) => {
      if (!socketList[key]) delete socketList[key];
    });
    return Object.keys(socketFlags).length === Object.keys(socketList).length;
  }
);

//reducer
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

export const SocketTypes = Types;
export const SocketActions = Creators;

export const SocketReducer = createReducer(SOCKET_INITIAL_STATE, {
  [Types.SET_CONVERSATION_SOCKET_READY]: setConversationSocketReady,
  [Types.SET_NOTIFICATION_SOCKET_READY]: setNotificationSocketReady,
  [Types.SET_USER_SOCKET_READY]: setUserSocketReady,
});
