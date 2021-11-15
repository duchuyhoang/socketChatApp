import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router";
import { SOCKET_ON_ACTIONS } from "../../../common/constant";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { ConversationAction } from "../../../redux/reducer/conversation";
import { UserAction } from "../../../redux/reducer/user";
import {
  CONVERSATION_SOCKET,
  NOTIFICATION_SOCKET,
} from "../../../socket/socket";
import Helmet from "../../components/Helmet";
import Main from "./Main";
import SidebarNav from "./SidebarNav";
import Modal from "../../shared/Modal";
import { ConfirmVideoCall } from "../../components/ConfirmVideoCall";
function Home(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [currentCallInfo, setCurrentCallInfo] = useState(null);
  const userInfo = useSelector((state) => state.auth.user);
  useSocketConnection();

  const conversationSocketState = useSelector(
    (state) => state.socket.socketReadyFlags.conversation
  );

  const handleCloseCall = () => {
    setCurrentCallInfo(null);
  };

  useEffect(() => {
    if (conversationSocketState) {
      CONVERSATION_SOCKET.on(
        SOCKET_ON_ACTIONS.JOIN_NEW_ROOM,
        ({ newConversation }) => {
          if (newConversation)
            dispatch(
              ConversationAction.onAddedToConversation({ newConversation })
            );
        }
      );
    }

    return () => {
      if (conversationSocketState)
        CONVERSATION_SOCKET.off(SOCKET_ON_ACTIONS.JOIN_NEW_ROOM);
    };
  }, [conversationSocketState]);

  useEffect(() => {
    // Handle someone call
    if (CONVERSATION_SOCKET) {
      CONVERSATION_SOCKET.on(
        SOCKET_ON_ACTIONS.EMIT_SOMEONE_CALL,
        ({ idRoom, callUser, newIdRoom }) => {
          if (callUser.id_user.toString() !== userInfo.id_user.toString()) {
            console.log("someonecall");
            setCurrentCallInfo({
              userInfo: callUser,
              newIdRoom: newIdRoom,
            });
          }
        }
      );
    }
  }, [CONVERSATION_SOCKET]);

  useEffect(() => {
    dispatch(UserAction.getListFriend());
    dispatch(ConversationAction.getConversation());
  }, [dispatch]);

  return (
    <Helmet title="Home">
      <div className="container">
        <SidebarNav />
        <Route path={`${path}/message/:idConversation`} component={Main} />
        {currentCallInfo && (
          <Modal>
            <ConfirmVideoCall currentCallInfo={currentCallInfo} handleClose={handleCloseCall}/>
          </Modal>
        )}
      </div>
    </Helmet>
  );
}

export default Home;
