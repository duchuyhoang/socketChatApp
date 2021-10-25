import { call, put } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import {
  getConversations,
  getSpecificConversation,
} from '../../services/apiMap';
import { ConversationAction } from '../reducer/conversation';

export const ConversationSaga = {
  *getConversation() {
    try {
      const response = yield call(() => getConversations());

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(ConversationAction.getConversationSucceed(response.data));
      }
    } catch (error) {}
  },

  *getSpecificConversation({ payload }) {
    try {
      const response = yield call(() =>
        getSpecificConversation({ id_conversation: payload.id })
      );

      console.log('🚀 ~ response', response);
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(ConversationAction.getSpecificConversationSucceed(response));
      }
    } catch (err) {}
  },
};
