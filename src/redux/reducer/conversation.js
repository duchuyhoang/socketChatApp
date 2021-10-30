import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import { transformListMessages } from '../../common/functions';

const CONVERSATION_INITIAL_STATE = {
  listConversation: null,
  mainConversationInfo: null,

  messages: null,
};

const { Types, Creators } = createActions({
  getConversation: null,
  getConversationSucceed: ['payload'],
  getSpecificConversation: ['payload'],
  getSpecificConversationSucceed: ['payload'],

  getMessages: ['payload'],
  getMessagesSucceed: ['payload'],
  insertMessages: ['payload'],
  sendMessage: ['payload'],
  sendMessageSucceed: ['payload'],
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

export const selectMessages = createSelector(selectSelf, (state) =>
  transformListMessages(state.messages)
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

const handleGetMessagesSucceed = (state, { payload }) => {
  return {
    ...state,
    messages: payload.data,
  };
};

const handleInsertMessage = (state, { payload }) => {
  let newList = state.messages;
  if (Array.isArray(payload.data)) {
    payload.data.forEach((item) => {
      newList.push(item);
    });
  } else newList.push(payload.data);

  return { ...state, messages: newList };
};

const handleSendMessageSucceed = (state, { payload }) => {
  return { ...state };
};

export const ConversationTypes = Types;
export const ConversationAction = Creators;

export const ConversationReducer = createReducer(CONVERSATION_INITIAL_STATE, {
  [Types.GET_CONVERSATION_SUCCEED]: handleGetConversationSucceed,
  [Types.GET_SPECIFIC_CONVERSATION_SUCCEED]:
    handleGetSpecificConversationSucceed,
  [Types.GET_MESSAGES_SUCCEED]: handleGetMessagesSucceed,
  [Types.INSERT_MESSAGES]: handleInsertMessage,
  [Types.SEND_MESSAGE_SUCCEED]: handleSendMessageSucceed,
});
