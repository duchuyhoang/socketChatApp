import { call, put } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import { answerFriendRequest, getAllNotification } from '../../services/apiMap';
import { NotificationActions } from '../reducer/notification';

export const NotificationSaga = {
  *getAllNotification({ payload }) {
    try {
      const response = yield call(() => getAllNotification());
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(NotificationActions.getAllNotificationSucceed(response.data));
      }
    } catch (error) {}
  },

  *answerFriendRequest({ payload }) {
    try {
      const response = yield call(() => answerFriendRequest(payload));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(
          NotificationActions.answerFriendRequestSucceed(
            payload.id_notification
          )
        );
      }
    } catch (error) {}
  },
};
