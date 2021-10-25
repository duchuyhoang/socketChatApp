import { all, takeLatest, debounce } from 'redux-saga/effects';
import { AuthSaga } from './authSaga';
import { AuthTypes } from '../reducer/auth';
import { SignupTypes } from '../reducer/signup';
import { UserSaga } from './userSaga';
import { UserTypes } from '../reducer/user';
import { ConversationTypes } from '../reducer/conversation';
import { ConversationSaga } from './conversationSaga';

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
  ]);
}
