import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router';
import {
  CONVERSATION_TYPE,
  MESSAGE_TYPE,
  SOCKET_ON_ACTIONS,
} from '../../../common/constant';
import { useSocketConnection } from '../../../hooks/useSocketConnection';
import { ConversationAction } from '../../../redux/reducer/conversation';
import { UserAction } from '../../../redux/reducer/user';
import {
  CONVERSATION_SOCKET,
  NOTIFICATION_SOCKET,
} from '../../../socket/socket';
import Helmet from '../../components/Helmet';
import Main from './Main';
import SidebarNav from './SidebarNav';
import Modal from '../../shared/Modal';
import { ConfirmVideoCall } from '../../components/ConfirmVideoCall';
import newMessageAudioMp3 from '../../../assets/sounds/newMessage.mp3';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { MessageNotification } from './MessageNotification';
import { NotificationActions } from '../../../redux/reducer/notification';
function Home(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [currentCallInfo, setCurrentCallInfo] = useState(null);
  const [newMessageAudio] = useState(new Audio(newMessageAudioMp3));
  const userInfo = useSelector((state) => state.auth.user);
  const listConversation = useSelector(
    (state) => state.conversation.listConversation
  );

  useSocketConnection();

  const conversationSocketState = useSelector(
    (state) => state.socket.socketReadyFlags.conversation
  );

  const handleCloseCall = () => {
    setCurrentCallInfo(null);
  };

  useEffect(() => {
    if (conversationSocketState) {
      // detect if someone add to new conversation
      CONVERSATION_SOCKET.on(
        SOCKET_ON_ACTIONS.JOIN_NEW_ROOM,
        ({ newConversation }) => {
          if (newConversation)
            dispatch(
              ConversationAction.onAddedToConversation({ newConversation })
            );
        }
      );

      CONVERSATION_SOCKET.on(SOCKET_ON_ACTIONS.EMIT_MESSAGE, (res) => {
        const {
          messageData: { data },
        } = res;
        dispatch(
          ConversationAction.updateLastMessage({
            data,
          })
        );
        let _data = Array.isArray(data) ? data[data.length - 1] : data;
        let _type = Array.isArray(data)
          ? data[data.length - 1]._type
          : res.messageData.messageType;

        if (_data.id_user.toString() != userInfo?.id_user.toString()) {
          newMessageAudio.play();
          let selectedConversation = null;

          for (let i = 0; i < listConversation.length; i++) {
            if (
              listConversation[i].id_room.toString() ===
              _data.id_conversation.toString()
            ) {
              selectedConversation = listConversation[i];
              break;
            }
          }

          toast(
            <MessageNotification
              id_room={selectedConversation ? selectedConversation.id_room : ''}
              room_name={
                selectedConversation
                  ? selectedConversation.type.toString() ===
                    CONVERSATION_TYPE.GROUP
                    ? selectedConversation.title
                    : selectedConversation.nextUserName
                  : ''
              }
              content={
                _type == MESSAGE_TYPE.ICON || _type == MESSAGE_TYPE.IMAGE
                  ? 'Ảnh mới'
                  : _type == MESSAGE_TYPE.TEXT
                  ? _data.content
                  : ''
              }
            />,
            {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              toastId: 'messageNotification',
              // draggable: true,
              // progress: undefined,
            }
          );
        }
      });
    }

    return () => {
      if (conversationSocketState)
        CONVERSATION_SOCKET.off(SOCKET_ON_ACTIONS.JOIN_NEW_ROOM);
      CONVERSATION_SOCKET.off(SOCKET_ON_ACTIONS.EMIT_MESSAGE);
    };
  }, [conversationSocketState]);

  useEffect(() => {
    // Handle someone call
    if (CONVERSATION_SOCKET) {
      CONVERSATION_SOCKET.on(
        SOCKET_ON_ACTIONS.EMIT_SOMEONE_CALL,
        ({ idRoom, callUser, newIdRoom }) => {
          if (callUser.id_user.toString() !== userInfo.id_user.toString()) {
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
    dispatch(NotificationActions.getAllNotification());
  }, [dispatch]);

  return (
    <Helmet title='Home'>
      <div className='container'>
        <SidebarNav />
        <Route path={`${path}/message/:idConversation`} component={Main} />
        {currentCallInfo && (
          <Modal>
            <ConfirmVideoCall
              currentCallInfo={currentCallInfo}
              handleClose={handleCloseCall}
            />
          </Modal>
        )}

        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          // draggable
          pauseOnHover
        />
      </div>
      <button
        onClick={() => {
          toast(<MessageNotification />, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            toastId: 'messageNotification',
            // draggable: true,
            // progress: undefined,
          });
        }}
      >
        Toast
      </button>
    </Helmet>
  );
}

export default Home;
