import { all, debounce, takeEvery, takeLatest } from 'redux-saga/effects';
import { AuthTypes } from '../reducer/auth';
import { ConversationTypes } from '../reducer/conversation';
import { MessageTypes } from '../reducer/message';
import { SignupTypes } from '../reducer/signup';
import { UserTypes } from '../reducer/user';
import { StickerTypes } from '../reducer/sticker';
import { AuthSaga } from './authSaga';
import { ConversationSaga } from './conversationSaga';
import { MessageSaga } from './messageSaga';
import { UserSaga } from './userSaga';
import { StickerSaga } from './stickerSaga';
import { NotificationTypes } from '../reducer/notification';
import { NotificationSaga } from './notificationSaga';
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
    takeEvery(UserTypes.SEND_REQUEST_ADD_FRIEND, UserSaga.sendRequestAddFriend),

    //conversation
    takeLatest(
      ConversationTypes.GET_CONVERSATION,
      ConversationSaga.getConversation
    ),
    takeLatest(
      ConversationTypes.GET_SPECIFIC_CONVERSATION,
      ConversationSaga.getSpecificConversation
    ),
    takeLatest(
      ConversationTypes.ADD_USER_TO_CONVERSATION,
      ConversationSaga.addUsersToConversation
    ),
    takeLatest(
      ConversationTypes.CREATE_GROUP_CHAT,
      ConversationSaga.createGroupChat
    ),

    //message
    takeLatest(MessageTypes.GET_MESSAGES, MessageSaga.getMessages),
    takeEvery(MessageTypes.CONTINUE_GET_MESSAGE, MessageSaga.continueGetMessages),
    takeEvery(MessageTypes.SEND_MESSAGE, MessageSaga.sendMessage),
  


    // sticker
    takeLatest(
      StickerTypes.GET_LIST_STICKER_CATEGORY,
      StickerSaga.getStickerCategory
    ),
    takeLatest(
      StickerTypes.GET_LIST_STICKER_BY_CATEGORY,
      StickerSaga.getStickerByCategory
    ),
    takeLatest(
      NotificationTypes.GET_ALL_NOTIFICATION,
      NotificationSaga.getAllNotification
    ),
    takeLatest(
      NotificationTypes.ANSWER_FRIEND_REQUEST,
      NotificationSaga.answerFriendRequest
    ),
  ]);
}
