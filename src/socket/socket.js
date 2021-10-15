import {SOCKET_CHAT_HOST,SOCKET_NAMESPACE} from "../common/constant";
import {baseConfig} from "./baseConfig";
import {io} from "socket.io-client";
export const MAIN_SOCKET=io(SOCKET_CHAT_HOST,{...baseConfig,autoConnect:true});

export const USER_SOCKET=io(`${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.USER}`,baseConfig)

export const CONVERSATION_SOCKET=io(`${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.CONVERSATION}`,baseConfig);
export const NOTIFICATION_SOCKET=io(`${SOCKET_CHAT_HOST}${SOCKET_NAMESPACE.NOTIFICATION}`,baseConfig);



export const refreshSocket=()=>{
    // MAIN_SOCKET.removeAllListeners();
    USER_SOCKET.removeAllListeners();
    CONVERSATION_SOCKET.removeAllListeners();
    NOTIFICATION_SOCKET.removeAllListeners();
}