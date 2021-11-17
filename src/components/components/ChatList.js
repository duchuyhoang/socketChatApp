import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import man from '../../assets/images/man.png';
import woman from '../../assets/images/woman.png';
import { SOCKET_ON_ACTIONS } from '../../common/constant';
import { MessageActions, selectMessages } from '../../redux/reducer/message';
import { ConversationAction } from '../../redux/reducer/conversation';
import { CONVERSATION_SOCKET } from '../../socket/socket';
import Avatar from '../shared/Avatar';
import CardChat from './CardChat';

const ChatList = ({ author }) => {
  const contentRef = useRef();
  let listMessages = useSelector(selectMessages);
  const dispatch = useDispatch();
console.log(author);
  //listen socket
  useEffect(() => {
    const listener = (response) => {
      const { data } = response;
      const id_sender=Array.isArray(data) ? +data[0].id_user : +data.id_user;
      if (id_sender === author) return;
      dispatch(
        MessageActions.insertListenMessages({
          data,
        })
      );
     
    };
    CONVERSATION_SOCKET.on(SOCKET_ON_ACTIONS.EMIT_MESSAGE, listener);

    return () => {
      CONVERSATION_SOCKET.off(SOCKET_ON_ACTIONS.EMIT_MESSAGE, listener);
    };
  }, []);

  useEffect(() => {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  });

  return (
    <div className='main__content' ref={contentRef}>
      <ul className='chat-list'>
        {listMessages &&
          listMessages.map((item, index) => (
            <li
              className={`chat-list__item ${
                author === item.idUser ? 'chat-list__item--me' : ''
              }`}
              key={index}
            >
              <Avatar
                img={item.avatar || (item.gender ? woman : man)}
                isOnline={true}
              />
              <ul>
                {item.messages &&
                  item.messages.map((message, index, arr) => {
                    const time =
                      index === arr.length - 1 ? item.createAt : null;

                    return (
                      <li key={message.idMessage}>
                        <CardChat
                          type={message.type}
                          createTime={time}
                          img={message.url}
                          status={message.status}
                          icon={message.icon}
                        >
                          {message.content}
                        </CardChat>
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatList;
