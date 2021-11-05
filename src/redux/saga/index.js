import { all, debounce, takeEvery, takeLatest } from 'redux-saga/effects';
import { AuthTypes } from '../reducer/auth';
import { ConversationTypes } from '../reducer/conversation';
import { MessageTypes } from '../reducer/message';
import { SignupTypes } from '../reducer/signup';
import { UserTypes } from '../reducer/user';
import { AuthSaga } from './authSaga';
import { ConversationSaga } from './conversationSaga';
import { MessageSaga } from './messageSaga';
import { UserSaga } from './userSaga';

export default function* rootSaga() {
  yield all([
    //auth
    takeLatest(AuthTypes.LOGIN_REQUEST, AuthSaga.login),
    takeLatest(AuthTypes.RELOGIN, AuthSaga.relogin),
    takeLatest(AuthTypes.EDIT_USER, AuthSaga.editUser),
    takeLatest(AuthTypes.EDIT_USER, AuthSaga.editUser),
    takeLatest(SignupTypes.SIGNUP, AuthSaga.signup),

    //user
    takeLatest(UserTypes.GET_LIST_FRIEND, UserSaga.getListFriend),
    debounce(500, UserTypes.SEARCH_USER, UserSaga.searchUser),

    //conversation
    takeLatest(
      ConversationTypes.GET_CONVERSATION,
      ConversationSaga.getConversation
    ),
    takeLatest(
      ConversationTypes.GET_SPECIFIC_CONVERSATION,
      ConversationSaga.getSpecificConversation
    ),

    //message
    takeLatest(MessageTypes.GET_MESSAGES, MessageSaga.getMessages),
    takeEvery(MessageTypes.SEND_MESSAGE, MessageSaga.sendMessage),
  ]);
}
