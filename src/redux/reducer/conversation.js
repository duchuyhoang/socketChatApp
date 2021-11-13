import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";
import { transformListMessages } from "../../common/functions";

const CONVERSATION_INITIAL_STATE = {
  listConversation: [],
  mainConversationInfo: null,
  isLoading: false,
  currentConversation: null,
};

const { Types, Creators } = createActions({
  getConversation: null,
  getConversationSucceed: ["payload"],
  getSpecificConversation: ["payload"],
  getSpecificConversationSucceed: ["payload"],

  addUserToConversation: ["payload"],
  addUserToConversationSucceed: ["payload"],

  onUserAdd: ["payload"],
  onAddedToConversation: ["payload"],

  setConversationLoading: ["payload"],
  setCurrentConversation: ["payload"],

  createGroupChat: ["payload"],
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

const handleGetConversationSucceed = (state, { payload }) => {
  return {
    ...state,
    listConversation: payload.data,
  };
};

const handleGetSpecificConversationSucceed = (state, { payload }) => {
  return {
    ...state,
    mainConversationInfo: payload.data,
    currentConversation: payload.data?.conversationInfo?.id_room || null,
  };
};

const handleSetLoading = (state, { payload }) => {
  return {
    ...state,
    isLoading: payload,
  };
};

const handleSetCurrentConversation = (state, { payload }) => {
  return { ...state, currentConversation: payload.id_room };
};

const handleAddUserToConversation = (state, { payload }) => {
  return state;
};

const onAddUserHandle = (state, { payload }) => {
  if (state.currentConversation?.toString() !== payload.id_room.toString())
    return state;

  return {
    ...state,
    mainConversationInfo: {
      ...state.mainConversationInfo,
      listUser: [...state.mainConversationInfo.listUser, ...payload.listUser],
    },
  };
};

const onAddedToConversation = (state, { payload }) => {
  return {
    ...state,
    listConversation: [...state.listConversation, payload.newConversation],
  };
};
const handleAddGroupChat = (state, payload) => {
  return state;
};

export const ConversationTypes = Types;
export const ConversationAction = Creators;

//reducer
export const ConversationReducer = createReducer(CONVERSATION_INITIAL_STATE, {
  [Types.GET_CONVERSATION_SUCCEED]: handleGetConversationSucceed,
  [Types.GET_SPECIFIC_CONVERSATION_SUCCEED]:
    handleGetSpecificConversationSucceed,
  [Types.SET_CONVERSATION_LOADING]: handleSetLoading,
  [Types.SET_CURRENT_CONVERSATION]: handleSetCurrentConversation,
  [Types.ADD_USER_TO_CONVERSATION]: handleAddUserToConversation,
  [Types.ADD_USER_TO_CONVERSATION_SUCCEED]: handleAddUserToConversation,
  [Types.ON_USER_ADD]: onAddUserHandle,
  [Types.ON_ADDED_TO_CONVERSATION]: onAddedToConversation,
  [Types.CREATE_GROUP_CHAT]: handleAddGroupChat,
});
