import { createActions, createReducer } from "reduxsauce";
import { parseJwt } from "../../common/functions";
const { Types, Creators } = createActions({
  loginRequest: ["payload"],
  loginSucceed: ["payload"],
});

export const AUTH_INITIAL_STATE = {
  user: null,
  accessToken: null,
  refreshToken: null,
  socketReadyFlag: {
    conversation: false,
    notification: false,
    use: false,
  },
};

const handleLoginSucceed = (state, { payload }) => {
  return {
    ...state,
    user: parseJwt(payload.accessToken),
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  };
};

export const AuthTypes = Types;
export const AuthActions = Creators;
console.log(AuthTypes);
export const AuthReducer = createReducer(AUTH_INITIAL_STATE, {
  [AuthTypes.LOGIN_SUCCEED]: handleLoginSucceed,
});
