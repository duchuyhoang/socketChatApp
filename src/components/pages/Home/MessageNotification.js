import React from "react";
import { Link } from "react-router-dom";

export const MessageNotification = (props) => {
  const { id_room, room_name, content } = props;
  console.log(content);
  return (
    <section className="message_notification">
      <div className="message_notification__header">
        <Link to={`/home/message/${id_room}`}>{room_name || ""}</Link>
        <small>Just now</small>
      </div>

      <div className="message_notification__content">{content || ""}</div>
    </section>
  );
};
