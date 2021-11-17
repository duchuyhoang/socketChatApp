import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import man from "../../assets/images/man.png";
import woman from "../../assets/images/woman.png";
import { SOCKET_ON_ACTIONS } from "../../common/constant";
import {
  MessageActions,
  selectMessages,
  selectLatestMessage,
  selectListMessageOffset,
  selectListMessageTotal,
  selectManualMessage,
  selectContinueLoadMessageStatus,
} from "../../redux/reducer/message";
import { ConversationAction } from "../../redux/reducer/conversation";
import { CONVERSATION_SOCKET } from "../../socket/socket";
import Avatar from "../shared/Avatar";
import CardChat from "./CardChat";
// import { useParams } from "react-router";
import { useRouteMatch } from "react-router";
import SpinLoading from "../shared/SpinLoading";

const ChatList = ({ author }) => {
  const contentRef = useRef();
  const newMessageBreakPointRef = useRef();
  const [currentLatestMessageIndex, setCurrentLatestMessageIndex] =
    useState(null);
  let listMessages = useSelector(selectMessages);
  let listManualMessage = useSelector(selectManualMessage);

  const latestMessage = useSelector(selectLatestMessage);
  const offset = useSelector(selectListMessageOffset);
  const total = useSelector(selectListMessageTotal);
  const continueLoadMessageStatus = useSelector(
    selectContinueLoadMessageStatus
  );

  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    if (currentLatestMessageIndex) {
      let rootElement = document.querySelector(".main__content");

      setTimeout(function () {
        rootElement.scrollTop =
          document.querySelector(`#${currentLatestMessageIndex.id}`).offsetTop -
          document.querySelector(".card-chat").offsetTop-20;
      }, 100);
    }
  }, [currentLatestMessageIndex]);

  //listen socket
  useEffect(() => {
    const listener = (response) => {
      const id_conversation = match.params.idConversation;
      const {
        messageData: { data },
      } = response;
      const id_sender = Array.isArray(data) ? +data[0].id_user : +data.id_user;
      const id_room = Array.isArray(data)
        ? +data[0].id_conversation
        : +data.id_conversation;
      if (
        id_sender === author ||
        id_conversation?.toString() !== id_room.toString()
      )
        return;
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
    let listMessageNode = document.querySelectorAll(".card-chat");
    let observer = null;
    const id_conversation = match.params.idConversation;
    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      observer = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            if (listManualMessage.length < total) {
              dispatch(
                MessageActions.continueGetMessage({
                  id_conversation,
                  limit: 10,
                  offset: offset + 10,
                  callback: () => {
                    setCurrentLatestMessageIndex(entries[0].target);
                  },
                })
              );

              observer.unobserve(listMessageNode[0]);
            }
            // console.log(entries[0].target.getAttribute("data-id"));
          }
          // console.log("entries", entries[0]);
        },
        {
          // root: rootElement,
          rootMargin: "0px 0px 90% 0px",
          threshold: 0.2,
        }
      );
      if (listMessageNode.length > 0) {
        // observer.observe(document.querySelector("#loadMoreMessageBreakPoint"));

        observer.observe(listMessageNode[0]);
      }
    }

    return () => {
      if (observer && listMessageNode.length > 0) {
        observer.unobserve(listMessageNode[0]);
      }
    };
  }, [listManualMessage]);

  useEffect(() => {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  });

  return (
    <div className="main__content" ref={contentRef}>
      {continueLoadMessageStatus === "loading" ||
      continueLoadMessageStatus === "failed" ? (
        <div className="loading-new-message-container">
        <SpinLoading />
          </div>
      ) : (
        <></>
      )}
      <ul className="chat-list" id="chatList">
        {listMessages &&
          listMessages.map((item, index) => (
            <li
              className={`chat-list__item ${
                author === item.idUser ? "chat-list__item--me" : ""
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
                          type={message._type}
                          createTime={time}
                          img={message.url}
                          status={message.status}
                          icon={message.icon}
                          id_message={message.idMessage}
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
