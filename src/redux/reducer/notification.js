import { createActions, createReducer } from 'reduxsauce';
import { NOTIFICATION_TYPE } from '../../common/constant';

const NOTIFICATION_INIT_STATE = {
  notification: null,
};

const { Types, Creators } = createActions({
  getAllNotification: ['payload'],
  getAllNotificationSucceed: ['payload'],
  answerFriendRequest: ['payload'],
  answerFriendRequestSucceed: ['payload'],
});

//reducer
const handleGetAllNotificationSucceed = (state, { payload }) => {
  return {
    ...state,
    notification: payload.data,
  };
};

const handleAnswerFriendRequestSucceed = (state, { payload }) => {
  const newNotification = state.notification.map((item) => {
    if (item.id_notification === payload)
      item.type = NOTIFICATION_TYPE.ACCEPT_FRIEND_REQUEST;
    return item;
  });
  return {
    ...state,
    notification: newNotification,
  };
};

export const NotificationTypes = Types;
export const NotificationActions = Creators;

export const NotificationReducer = createReducer(NOTIFICATION_INIT_STATE, {
  [Types.GET_ALL_NOTIFICATION_SUCCEED]: handleGetAllNotificationSucceed,
  [Types.ANSWER_FRIEND_REQUEST_SUCCEED]: handleAnswerFriendRequestSucceed,
});
