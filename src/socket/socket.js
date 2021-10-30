<<<<<<< HEAD
import { SOCKET_CHAT_HOST, SOCKET_NAMESPACE } from '../common/constant';
import { baseConfig } from './baseConfig';
import { io } from 'socket.io-client';
export const MAIN_SOCKET = io(SOCKET_CHAT_HOST, {
  ...baseConfig,
  autoConnect: true,
});
=======
import {SOCKET_CHAT_HOST,SOCKET_NAMESPACE} from "../common/constant";
import {baseConfig} from "./baseConfig";
import {io} from "socket.io-client";

export const MAIN_SOCKET=io(SOCKET_CHAT_HOST,{...baseConfig,autoConnect:true});
>>>>>>> aaf423c3b6c7bef57abd8cf613fcd15dc3b84e2c

export const USER_SOCKET = io(
  `${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.USER}`,
  baseConfig
);

<<<<<<< HEAD
export const CONVERSATION_SOCKET = io(
  `${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.CONVERSATION}`,
  baseConfig
);
export const NOTIFICATION_SOCKET = io(
  `${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.NOTIFICATION}`,
  baseConfig
);

export const refreshSocket = () => {
  // MAIN_SOCKET.removeAllListeners();
  USER_SOCKET.removeAllListeners();
  CONVERSATION_SOCKET.removeAllListeners();
  NOTIFICATION_SOCKET.removeAllListeners();
};
=======
export const CONVERSATION_SOCKET=io(`${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.CONVERSATION}`,baseConfig);
export const NOTIFICATION_SOCKET=io(`${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.NOTIFICATION}`,baseConfig);
export const CALL_SOCKET=io(`${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.CALL}`,{...baseConfig});

export const refreshSocket=()=>{
    // MAIN_SOCKET.removeAllListeners();
    USER_SOCKET.removeAllListeners();
    CONVERSATION_SOCKET.removeAllListeners();
    NOTIFICATION_SOCKET.removeAllListeners();
    // CALL_SOCKET.removeAllListeners();
}
>>>>>>> aaf423c3b6c7bef57abd8cf613fcd15dc3b84e2c
