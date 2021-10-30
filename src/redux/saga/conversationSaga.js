import { call, put } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import {
  getConversations,
  getMessage,
  getSpecificConversation,
  sendMessage,
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

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(ConversationAction.getSpecificConversationSucceed(response));

        const limit = 20;
        const offset = +response.data.conversationInfo.message_count - limit;

        //get first list message when click room
        yield put(
          ConversationAction.getMessages({
            offset: offset > 0 ? offset : 0,
            limit: limit,
            id_conversation: response.data.conversationInfo.id_room,
          })
        );
      }
    } catch (err) {}
  },

  *getMessages({ payload }) {
    try {
      const queryParams = new URLSearchParams({ ...payload });

      const response = yield call(() => getMessage({ queryParams }));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(ConversationAction.getMessagesSucceed(response.data));
      }
    } catch (error) {}
  },

  *sendMessage({ payload }) {
    try {
      const response = yield call(() => sendMessage(payload));
      if (response.status === HttpStatusCode.SUCCESS) {
        console.log('🚀 ~ response send mess', response);
        yield put(ConversationAction.sendMessageSucceed(response.data));
      }
    } catch (error) {}
  },
};
