import { call, put } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import { getMessage, sendMessage } from '../../services/apiMap';
import { MessageActions } from '../reducer/message';

export const MessageSaga = {
  *sendMessage({ payload }) {
    try {
      const response = yield call(() => sendMessage(payload.data));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(MessageActions.sendMessageSucceed(response.data));
      }
    } catch (error) {
      yield put(MessageActions.sendMessageFailed(payload.idPreview));
    }
  },

  *getMessages({ payload }) {
    try {
      const queryParams = new URLSearchParams({ ...payload });

      const response = yield call(() => getMessage({ queryParams }));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(MessageActions.getMessagesSucceed(response.data));
      }
    } catch (error) {}
  },
};
