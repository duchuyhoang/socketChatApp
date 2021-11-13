import { combineReducers } from 'redux';
import { AuthReducer } from './auth';
import { ConversationReducer } from './conversation';
import { MessageReducer } from './message';
import { SignupReducer } from './signup';
import { SocketReducer } from './socket';
import { UiReducer } from './ui';
import { UserReducer } from './user';
import { StickerReducer } from './sticker';
import { NotificationReducer } from './notification';

const rootReducer = combineReducers({
  auth: AuthReducer,
  ui: UiReducer,
  signup: SignupReducer,
  user: UserReducer,
  conversation: ConversationReducer,
  message: MessageReducer,
  socket: SocketReducer,
  sticker: StickerReducer,
  notification: NotificationReducer,
});

export default rootReducer;
