import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

const USER_INITIAL_STATE = {
  listFriend: null,
  searchUserResult: null,
};

const { Types, Creators } = createActions({
  getListFriend: null,
  getListFriendSucceed: ['payload'],
  searchUser: ['payload'],
  searchUserSucceed: ['payload'],
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

export const UserTypes = Types;
export const UserAction = Creators;

export const UserReducer = createReducer(USER_INITIAL_STATE, {
  [Types.GET_LIST_FRIEND_SUCCEED]: handleGetListFriendSucceed,
  [Types.SEARCH_USER_SUCCEED]: handleSearchUserSucceed,
});
