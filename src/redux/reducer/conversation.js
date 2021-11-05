import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import { transformListMessages } from '../../common/functions';

const CONVERSATION_INITIAL_STATE = {
  listConversation: null,
  mainConversationInfo: null,
  isLoading: false,
};

const { Types, Creators } = createActions({
  getConversation: null,
  getConversationSucceed: ['payload'],
  getSpecificConversation: ['payload'],
  getSpecificConversationSucceed: ['payload'],

  setConversationLoading: ['payload'],
});

//selector
const selectSelf = (state) => state.conversation;

export const selectListConversation = createSelector(
  selectSelf,
  (state) => state.listConversation
);

export const selectMainConversation = createSelector(
  selectSelf,
  (state) => state.mainConversationInfo
);

export const selectMessageLoading = createSelector(
  selectSelf,
  (state) => state.isLoading
);

export const selectConversationLoading = createSelector(
  selectSelf,
  (state) => !!!state.listConversation
);

//reducer
const handleGetConversationSucceed = (state, { payload }) => {
  return {
    ...state,
    listConversation: payload.data,
  };
};

const handleGetSpecificConversationSucceed = (state, { payload }) => {
  return { ...state, mainConversationInfo: payload.data };
};

const handleSetLoading = (state, { payload }) => {
  return {
    ...state,
    isLoading: payload,
  };
};

export const ConversationTypes = Types;
export const ConversationAction = Creators;

export const ConversationReducer = createReducer(CONVERSATION_INITIAL_STATE, {
  [Types.GET_CONVERSATION_SUCCEED]: handleGetConversationSucceed,
  [Types.GET_SPECIFIC_CONVERSATION_SUCCEED]:
    handleGetSpecificConversationSucceed,
  [Types.SET_CONVERSATION_LOADING]: handleSetLoading,
});
