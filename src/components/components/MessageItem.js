import React from 'react';
import Avatar from '../shared/Avatar';
import Moment from 'react-moment';

const MessageItem = (props) => {
  const { item } = props;
  const active = item.countUnreadMessage > 0;

  return (
    <div className={`message-item ${active ? 'active' : ''}`}>
      <div className='message-item__avatar'>
        <Avatar img={item.avatar} isOnline={true} />
      </div>
      <div className={`message-item__content ${active ? 'hight-light' : ''}`}>
        <div className='message-item__content__name'>{item.name}</div>
        <div className='message-item__content__message'>
          <span>{item.lassMessage.form} </span>
          {item.lassMessage.content}
        </div>
      </div>
      <div className='message-item__time'>
        <span>
          <Moment toNow>{item.sendingTime}</Moment>
        </span>
        {active && (
          <div className='message-item__time__count'>
            +{item.countUnreadMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
