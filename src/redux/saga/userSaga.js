import { call, put, all } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import {
  getUserFriendList,
  searchUser,
  sendRequestAddFriend,
} from '../../services/apiMap';
import { UserAction } from '../reducer/user';

export const UserSaga = {
  *getListFriend() {
    try {
      const response = yield call(() => getUserFriendList());
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(UserAction.getListFriendSucceed(response.data));
      }
    } catch (error) {}
  },

  *searchUser(action) {
    try {
      const { keyword } = action.payload;
      const queryParams = new URLSearchParams({ keyword });
      const response = yield call(() => searchUser({ queryParams }));

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(UserAction.searchUserSucceed(response.data));
      }
    } catch (error) {}
  },

  *sendRequestAddFriend({ payload }) {
    try {
      yield put(UserAction.setUserLoading(true));
      const response = yield call(() => sendRequestAddFriend(payload.data));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield all([
          put(UserAction.sendRequestAddFriendSucceed(payload.idUser)),
          put(UserAction.setUserLoading(false)),
        ]);
      }
    } catch (error) {}
  },
};
