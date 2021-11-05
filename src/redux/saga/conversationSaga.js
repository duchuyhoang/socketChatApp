import { call, put } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import {
  getConversations,
  getSpecificConversation,
} from '../../services/apiMap';
import { ConversationAction } from '../reducer/conversation';
import { MessageSaga } from './messageSaga';

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
      yield put(ConversationAction.setConversationLoading(true));
      const response = yield call(() =>
        getSpecificConversation({ id_conversation: payload.id })
      );

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(ConversationAction.getSpecificConversationSucceed(response));

        //get first list message when click room
        yield call(MessageSaga.getMessages, {
          payload: {
            offset: 0,
            limit: 20,
            id_conversation: response.data.conversationInfo.id_room,
          },
        });

        yield put(ConversationAction.setConversationLoading(false));
      }
    } catch (err) {}
  },
};
