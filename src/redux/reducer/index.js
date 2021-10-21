import { combineReducers } from 'redux';
import { AuthReducer } from './auth';
import { UiReducer } from './ui';

const rootReducer = combineReducers({
  auth: AuthReducer,
  ui: UiReducer,
});

export default rootReducer;
