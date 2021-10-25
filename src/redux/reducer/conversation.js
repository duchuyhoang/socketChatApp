import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';

const CONVERSATION_INITIAL_STATE = {
  listConversation: null,
  mainConversationInfo: null,
};

const { Types, Creators } = createActions({
  getConversation: null,
  getConversationSucceed: ['payload'],
  getSpecificConversation: ['payload'],
  getSpecificConversationSucceed: ['payload'],
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

//reducer
const handleGetConversationSucceed = (state, { payload }) => {
  return {
    ...state,
    listConversation: payload.data,
  };
};

const handleGetSpecificConversationSucceed = (state, { payload }) => {
  console.log('🚀 ~ payload', payload);
  return { ...state, mainConversationInfo: payload.data };
};

export const ConversationTypes = Types;
export const ConversationAction = Creators;

export const ConversationReducer = createReducer(CONVERSATION_INITIAL_STATE, {
  [Types.GET_CONVERSATION_SUCCEED]: handleGetConversationSucceed,
  [Types.GET_SPECIFIC_CONVERSATION_SUCCEED]:
    handleGetSpecificConversationSucceed,
});
