import { createActions, createReducer } from "reduxsauce";
import { createSelector } from "reselect";
import { transformListMessages } from "../../common/functions";

const CONVERSATION_INITIAL_STATE = {
  listConversation: null,
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

  setConversationLoading: ["payload"],
  setCurrentConversation: ["payload"],
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


const handleAddUserToConversation=(state,{payload})=>{
  console.log(payload);
  console.log(state);
  return state;
}


export const ConversationTypes = Types;
export const ConversationAction = Creators;

//reducer
export const ConversationReducer = createReducer(CONVERSATION_INITIAL_STATE, {
  [Types.GET_CONVERSATION_SUCCEED]: handleGetConversationSucceed,
  [Types.GET_SPECIFIC_CONVERSATION_SUCCEED]:
    handleGetSpecificConversationSucceed,
  [Types.SET_CONVERSATION_LOADING]: handleSetLoading,
  [Types.SET_CURRENT_CONVERSATION]: handleSetCurrentConversation,
  [Types.ADD_USER_TO_CONVERSATION]:handleAddUserToConversation
});
