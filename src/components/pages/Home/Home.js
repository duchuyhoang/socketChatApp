import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router";
import { SOCKET_ON_ACTIONS } from "../../../common/constant";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { ConversationAction } from "../../../redux/reducer/conversation";
import { UserAction } from "../../../redux/reducer/user";
import { CONVERSATION_SOCKET } from "../../../socket/socket";
import Helmet from "../../components/Helmet";
import Main from "./Main";
import SidebarNav from "./SidebarNav";

function Home(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  useSocketConnection();

  const conversationSocketState = useSelector(
    (state) => state.socket.socketReadyFlags.conversation
  );

  useEffect(() => {
    if (conversationSocketState) {
      CONVERSATION_SOCKET.on(
        SOCKET_ON_ACTIONS.JOIN_NEW_ROOM,
        ({ newConversation }) => {
          if(newConversation)
          dispatch(ConversationAction.onAddedToConversation({newConversation}))
        }
      );
    }

    return () => {
      if (conversationSocketState)
        CONVERSATION_SOCKET.off(SOCKET_ON_ACTIONS.JOIN_NEW_ROOM);
    };
  }, [conversationSocketState]);

  useEffect(() => {
    dispatch(UserAction.getListFriend());
    dispatch(ConversationAction.getConversation());
  }, [dispatch]);

  return (
    <Helmet title="Home">
      <div className="container">
        <SidebarNav />
        <Route path={`${path}/message/:idConversation`} component={Main} />
      </div>
    </Helmet>
  );
}

export default Home;
