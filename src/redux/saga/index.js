import { all, takeLatest } from 'redux-saga/effects';
import { AuthSaga } from './authSaga';
import { AuthTypes } from '../reducer/auth';
import { SignupTypes } from '../reducer/signup';

export default function* rootSaga() {
  yield all([
    takeLatest(AuthTypes.LOGIN_REQUEST, AuthSaga.login),
    takeLatest(AuthTypes.RELOGIN, AuthSaga.relogin),
    takeLatest(SignupTypes.SIGNUP, AuthSaga.signup),
  ]);
}
