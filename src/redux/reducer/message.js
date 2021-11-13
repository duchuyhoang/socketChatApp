import { createActions, createReducer } from 'reduxsauce';
import { createSelector } from 'reselect';
import { v4 } from 'uuid';
import { MESSAGE_STATUS, MESSAGE_TYPE } from '../../common/constant';
import { transformListMessages } from '../../common/functions';

const MESSAGE_INIT_STATE = {
  messages: [],
  previewMessages: [],
  error: null,
  status: 'idle',
};

const { Types, Creators } = createActions({
  getMessages: ['payload'],
  getMessagesSucceed: ['payload'],
  insertPreviewMessages: ['payload'],
  insertListenMessages: ['payload'],
  sendMessage: ['payload'],
  sendMessageSucceed: ['payload'],
  sendMessageFailed: ['payload'],
});

//selector
const selectSelf = (state) => state.message;

export const selectMessages = createSelector(selectSelf, (state) => {
  const flatPreviewMessage = [];
  for (const [_, value] of Object.entries(state.previewMessages)) {
    flatPreviewMessage.push(value);
  }

  return transformListMessages(state.messages.concat(...flatPreviewMessage));
});

//reducer
const handleGetMessagesSucceed = (state, { payload }) => {
  return {
    ...state,
    messages: payload.data,
  };
};

const handleInsertPreviewMessages = (state, { payload }) => {
  const newMessage = [];

  if (payload.type === MESSAGE_TYPE.TEXT) {
    newMessage.push({
      type: payload.type,
      id_user: payload.idUser,
      avatar: payload.avatar,
      sex: payload.sex,
      content: payload.content,
      url: payload.listImages,
      message_create_at: Date.now(),
      id_message: v4(),
      status: MESSAGE_STATUS.PENDING,
    });
  }

  if (payload.type === MESSAGE_TYPE.IMAGE) {
    payload.listImages.forEach((item) => {
      newMessage.push({
        type: payload.type,
        id_user: payload.idUser,
        avatar: payload.avatar,
        sex: payload.sex,
        content: payload.content,
        url: item,
        message_create_at: Date.now(),
        id_message: v4(),
        status: MESSAGE_STATUS.PENDING,
      });
    });
  }

  if (payload.type === MESSAGE_TYPE.TEXT_AND_IMAGE) {
    newMessage.push({
      type: MESSAGE_TYPE.TEXT,
      id_user: payload.idUser,
      avatar: payload.avatar,
      sex: payload.sex,
      content: payload.content,
      url: null,
      message_create_at: Date.now(),
      id_message: v4(),
      status: MESSAGE_STATUS.PENDING,
    });
    payload.listImages.forEach((item) => {
      newMessage.push({
        type: MESSAGE_TYPE.IMAGE,
        id_user: payload.idUser,
        avatar: payload.avatar,
        sex: payload.sex,
        content: null,
        url: item,
        message_create_at: Date.now(),
        id_message: v4(),
        status: MESSAGE_STATUS.PENDING,
      });
    });
  }

  if (payload.type === MESSAGE_TYPE.ICON) {
    newMessage.push({
      type: payload.type,
      id_user: payload.idUser,
      avatar: payload.avatar,
      sex: payload.sex,
      content: payload.content,
      icon: payload.icon,
      url: null,
      message_create_at: Date.now(),
      id_message: v4(),
      status: MESSAGE_STATUS.PENDING,
    });
  }

  const newList = state.previewMessages;
  newList[payload.idPreview] = newMessage;

  return {
    ...state,
    previewMessages: newList,
  };
};

const handleInsertListenMessages = (state, { payload }) => {
  state.messages.push(payload.data);
  return {
    ...state,
    messages: [...state.messages],
  };
};

const handleSendMessageSucceed = (state, { payload }) => {
  const newList = state.messages;
  const { data } = payload;
  const idPreview = payload.id_preview || payload.data.id_preview;

  if (Array.isArray(data)) {
    data.forEach((value) => newList.push(value));
  } else newList.push(data);

  delete state.previewMessages[idPreview];

  return {
    ...state,
    messages: newList,
    previewMessages: { ...state.previewMessages },
  };
};

const handleSendMessageFailed = (state, { payload: idPreview }) => {
  const messageError = state.previewMessages[idPreview];
  messageError.map((item) => (item.status = MESSAGE_STATUS.ERROR));
  state.messages.push(...messageError);

  delete state.previewMessages[idPreview];

  return {
    ...state,
    messages: [...state.messages],
    previewMessages: [...state.previewMessages],
  };
};

export const MessageTypes = Types;
export const MessageActions = Creators;

export const MessageReducer = createReducer(MESSAGE_INIT_STATE, {
  [Types.GET_MESSAGES_SUCCEED]: handleGetMessagesSucceed,
  [Types.INSERT_PREVIEW_MESSAGES]: handleInsertPreviewMessages,
  [Types.INSERT_LISTEN_MESSAGES]: handleInsertListenMessages,
  [Types.SEND_MESSAGE_SUCCEED]: handleSendMessageSucceed,
  [Types.SEND_MESSAGE_FAILED]: handleSendMessageFailed,
});
