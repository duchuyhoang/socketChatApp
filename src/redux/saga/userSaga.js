import { call, put } from '@redux-saga/core/effects';
import { HttpStatusCode } from '../../common/constant';
import { getUserFriendList, searchUser } from '../../services/apiMap';
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
        console.log('🚀 ~ response', response);
        yield put(UserAction.searchUserSucceed(response.data));
      }
    } catch (error) {}
  },
};
