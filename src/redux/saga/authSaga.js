import { all, call, put } from 'redux-saga/effects';
import { HttpStatusCode } from '../../common/constant';
import { editUser, login, relogin, signup } from '../../services/apiMap';
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
          put(UiActions.setLoading(false)),
          put(
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
        yield put(AuthActions.reloginSucceed(response.data));
      }
    } catch (err) {}
  },

  *signup(action) {
    try {
      yield put(UiActions.setLoading(true));
      const response = yield call(() => signup(action.payload));

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(SignupAction.signupSuccess());
        yield all([
          put(UiActions.setLoading(false)),
          put(
            UiActions.notificationSuccess({
              message: 'Đăng kí thành công!',
            })
          ),
        ]);
      }
    } catch (err) {
      const errorResponse = err.response;

      yield put(SignupAction.signupFailed({ status: errorResponse.status }));

      yield all([
        put(UiActions.setLoading(false)),
        put(UiActions.notificationFailed({ message: 'Đăng kí thất bại!' })),
      ]);
    }
  },

  *editUser(action) {
    try {
      yield put(UiActions.setLoading(true));
      const response = yield call(() => editUser(action.payload));

      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(AuthActions.editUserSucceed(response.data));

        yield all([
          put(UiActions.setLoading(false)),
          put(
            UiActions.notificationSuccess({ message: 'Cập nhật thành công' })
          ),
        ]);
      }
    } catch (err) {
      const errorResponse = err.response;

      yield put(AuthActions.editUserFailed({ status: errorResponse.status }));
      yield all([
        put(UiActions.setLoading(false)),
        put(UiActions.notificationFailed({ message: 'Cập nhật thất bại!' })),
      ]);
    }
  },
};
