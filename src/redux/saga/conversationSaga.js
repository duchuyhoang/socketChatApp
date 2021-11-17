import { call, put } from "@redux-saga/core/effects";
import { HttpStatusCode } from "../../common/constant";
import {
  getConversations,
  getSpecificConversation,
  addUsersToConversation,
  createGroupChat,
} from "../../services/apiMap";
import { ConversationAction } from "../reducer/conversation";
import { UiActions } from "../reducer/ui";
import { MessageSaga } from "./messageSaga";

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
            limit: 10,
            id_conversation: response.data.conversationInfo.id_room,
          },
        });

        yield put(ConversationAction.setConversationLoading(false));
      }
    } catch (err) {}
  },

  *addUsersToConversation({ payload }) {
    try {
      const response = yield call(() => addUsersToConversation({ ...payload }));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(
          UiActions.notificationSuccess({ message: "Thêm thành công" })
        );
      }
    } catch (err) {
      yield put(UiActions.notificationFailed({ message: "Thêm thất bại" }));
    }
  },

  *createGroupChat({ payload }) {
    try {
      const response = yield call(() => createGroupChat({ ...payload }));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(
          UiActions.notificationSuccess({ message: "Tạo phòng thành công" })
        );
      }
    } catch (err) {
      yield put(
        UiActions.notificationFailed({ message: "Tạo phòng thất bại" })
      );
    }
  },
};
