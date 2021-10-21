import { get, post } from './apiClient';

export const login = (payload) => {
  return post('authen/login', payload);
};

export const signup = (payload) => {
  return post('authen/signup', payload);
};

export const relogin = (payload) => {
  return post('authen/re_login', payload);
};
export const getUserFriendList = (payload) => {
  return get('user/friendList');
};
