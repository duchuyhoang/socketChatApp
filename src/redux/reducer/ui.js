import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

const UI_INITIAL_STATE = {
  isLoading: false,
  notification: null,
};

const { Types, Creators } = createActions({
  setLoading: ['payload'],
  notificationSuccess: ['payload'],
  notificationFailed: ['payload'],
});

export const UiActions = Creators;
export const UiTypes = Types;

const selectSelf = (state) => state.ui;
export const selectNotification = createSelector(
  selectSelf,
  (state) => state.notification
);

const handleSetLoading = (state, { payload }) => {
  return {
    ...state,
    isLoading: payload,
  };
};

const handleNotificationSuccess = (state, { payload }) => {
  return {
    ...state,
    notification: {
      status: 'success',
      message: payload.message,
    },
  };
};
const handleNotificationFailed = (state, { payload }) => {
  return {
    ...state,
    notification: {
      status: 'error',
      message: payload.message,
    },
  };
};

export const UiReducer = createReducer(UI_INITIAL_STATE, {
  [Types.SET_LOADING]: handleSetLoading,
  [Types.NOTIFICATION_SUCCESS]: handleNotificationSuccess,
  [Types.NOTIFICATION_FAILED]: handleNotificationFailed,
});
