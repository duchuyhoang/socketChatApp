import { get, post } from './apiClient';

//auth
export const login = (payload) => {
  return post('authen/login', payload);
};

export const signup = (payload) => {
  return post('authen/signup', payload);
};

export const relogin = (payload) => {
  return post('authen/re_login', payload);
};

export const refreshToken = (payload) => {
  return post('authen/refresh_token', payload);
};

//User
export const getUserFriendList = (payload) => {
  return get('user/friendList');
};

export const editUser = (payload) => {
  return post('user/editUser', payload);
};

export const searchUser = (payload) => {
  return get(`user/searchUser?${payload.queryParams}`);
};

export const sendRequestAddFriend = (payload) => {
  return post('notification/insertNewFriendRequest', payload);
};

//conversation
export const getConversations = (payload) => {
  return get('conversation/getConversations');
};

export const getSpecificConversation = (payload) => {
  return get(`conversation/getSpecificConversation/${payload.id_conversation}`);
};

export const addUsersToConversation = (payload) => {
  return post(`conversation/addUsersToConversation`, payload);
};
export const addUsersToConversation = (payload) => {
  return post(`conversation/addUsersToConversation`, payload);
};

export const createGroupChat = (payload) => {
  return post(`conversation/createGroupChat`, payload);
};

//message
export const sendMessage = (payload) => {
  return post('message/sendMessage', payload);
};

export const getMessage = (payload) => {
  return get(`/message/getMessages?${payload.queryParams}`);
};

// Sticker
export const getListStickerCategory = () => {
  return get(`/upload/getIconCategory`);
};

export const getListStickerByCategory = (payload) => {
  return get(`/upload/getIconByCategory/${payload.id_category}`);
};

//notification
export const getAllNotification = () => {
  return get('notification/getAllNotification');
};
export const answerFriendRequest = (payload) => {
  return post('notification/answerFriendRequest', payload);
};
