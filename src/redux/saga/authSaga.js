import { call, put, all } from 'redux-saga/effects';
import { HttpStatusCode } from '../../common/constant';
import { login, relogin, signup } from '../../services/apiMap';
import { AuthActions } from '../reducer/auth';
import { SignupAction } from '../reducer/signup';
import { UiActions } from '../reducer/ui';
export const AuthSaga = {
  *login(action) {
    try {
      // Axios response data type
      yield put(UiActions.setLoading(true));
      const response = yield call(() => login(action.payload));

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(AuthActions.loginSucceed(response.data));

        yield all([
          yield put(UiActions.setLoading(false)),
          yield put(
            UiActions.notificationSuccess({ message: 'Đăng nhập thành công!' })
          ),
        ]);
      }
    } catch (err) {
      const errorResponse = err.response;

      yield put(AuthActions.loginFailed({ status: errorResponse.status }));
      yield all([
        put(UiActions.setLoading(false)),
        put(UiActions.notificationFailed({ message: 'Đăng nhập thất bại!' })),
      ]);
    }
  },

  *relogin(action) {
    try {
      const response = yield call(() => relogin(action.payload || {}));

      if (response.status === HttpStatusCode.SUCCESS) {
        yield all([
          put(AuthActions.reloginSucceed(response.data)),
          put(
            UiActions.notificationFailed({
              message: 'Đăng nhập thất bại!',
            })
          ),
        ]);
      }
    } catch (err) {}
  },

  *signup(action) {
    try {
      const response = yield call(() => signup(action.payload));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(SignupAction.signupSuccess(response.data));
      }
    } catch (err) {}
  },
};
