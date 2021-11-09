import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SOCKET_ON_ACTIONS } from "../../../common/constant";
import { CONVERSATION_SOCKET } from "../../../socket/socket";
import { ConversationAction } from "../../../redux/reducer/conversation"; 
export const useRoomChat = (id_room) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (id_room) {
      CONVERSATION_SOCKET.on(SOCKET_ON_ACTIONS.USERS_JOIN_ROOM, (data) => {
          dispatch(ConversationAction.onUserAdd({
              id_room:id_room,
              listUser:data.listNewUser
          }))
      });
    }
    return () => {
      CONVERSATION_SOCKET.off(SOCKET_ON_ACTIONS.USERS_JOIN_ROOM);
    };
  }, [id_room]);
};
