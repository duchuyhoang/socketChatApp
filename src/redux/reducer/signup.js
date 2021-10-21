import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  signup: ['payload'],
  signupSuccess: ['payload'],
  signupFailed: ['payload'],
});

export const SignupAction = Creators;
export const SignupTypes = Types;

const handleSignupSuccess = (state, payload) => {};
const handleSignupFailed = (state, payload) => {};

export const SignupReducer = createReducer(
  { error: null },
  {
    [Types.SIGNUP_SUCCESS]: handleSignupSuccess,
    [Types.SIGNUP_FAILED]: handleSignupFailed,
  }
);
