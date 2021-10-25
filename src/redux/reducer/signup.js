import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  signup: ['payload'],
  signupSuccess: ['payload'],
  signupFailed: ['payload'],
});

export const SignupAction = Creators;
export const SignupTypes = Types;

const handleSignupSuccess = (state) => {
  return {
    ...state,
    error: null,
  };
};
const handleSignupFailed = (state, { payload }) => {
  return {
    ...state,
    error:
      payload.status === 400
        ? 'Tài khoản đã được sử dụng!'
        : 'Something went wrong...!',
  };
};

export const SignupReducer = createReducer(
  { error: null },
  {
    [Types.SIGNUP_SUCCESS]: handleSignupSuccess,
    [Types.SIGNUP_FAILED]: handleSignupFailed,
  }
);
