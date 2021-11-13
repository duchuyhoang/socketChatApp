import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

const USER_INITIAL_STATE = {
  listFriend: null,
  searchUserResult: null,
  isUserLoading: false,
};

const { Types, Creators } = createActions({
  getListFriend: null,
  getListFriendSucceed: ['payload'],
  searchUser: ['payload'],
  searchUserSucceed: ['payload'],
  sendRequestAddFriend: ['payload'],
  sendRequestAddFriendSucceed: ['payload'],
  setUserLoading: ['payload'],
});

//selector
const selectSelf = (state) => state.user;
export const selectListFriend = createSelector(
  selectSelf,
  (state) => state.listFriend
);

export const selectSearchUser = createSelector(
  selectSelf,
  (state) => state.searchUserResult
);

//reducer
const handleGetListFriendSucceed = (state, { payload }) => {
  return {
    ...state,
    listFriend: payload.listFriend,
  };
};

const handleSearchUserSucceed = (state, { payload }) => {
  return {
    ...state,
    searchUserResult: payload.result,
  };
};

const handleSetUserLoading = (state, { payload }) => {
  return {
    ...state,
    isLoading: payload,
  };
};

const handleSendRequestAddFriendSucceed = (state, { payload }) => {
  const res = state.searchUserResult.map((item) => {
    if (item.id_user === payload) {
      item.can_make_friend_request = 0;
      item.friendStatus = 0;
    }
    return item;
  });

  return {
    ...state,
    searchUserResult: res,
  };
};

export const UserTypes = Types;
export const UserAction = Creators;

export const UserReducer = createReducer(USER_INITIAL_STATE, {
  [Types.GET_LIST_FRIEND_SUCCEED]: handleGetListFriendSucceed,
  [Types.SEARCH_USER_SUCCEED]: handleSearchUserSucceed,
  [Types.SEND_REQUEST_ADD_FRIEND_SUCCEED]: handleSendRequestAddFriendSucceed,
  [Types.SET_USER_LOADING]: handleSetUserLoading,
});
