import { login, signup } from "../../services/apiMap";
import { call,put } from "redux-saga/effects";
import { HttpStatusCode } from "../../common/constant";
import {AuthActions} from "../reducer/auth";
export const AuthSaga = {
  *login(action) {
    try {
      // Axios response data type
      const response = yield call(() => login(action.payload));
      if (response.status === HttpStatusCode.SUCCESS) {
        yield put(AuthActions.loginSucceed(response.data));
      }
    } catch (err) {}
  },
};
