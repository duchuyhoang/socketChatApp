import React from 'react';
import Avatar from '../shared/Avatar';
import Moment from 'react-moment';
import man from '../../assets/images/man.png';
import woman from '../../assets/images/woman.png';

const MessageUser = (props) => {
  const { item } = props;
  const active = item.countUnreadMessage > 0;
  const avatar = item.avatar ? item.avatar : item.sex === 0 ? man : woman;

  return (
    <div className={`message-item ${active ? 'active' : ''}`}>
      <div className='message-item__avatar'>
        <Avatar img={avatar} isOnline={true} />
      </div>
      <div className={`message-item__content ${active ? 'hight-light' : ''}`}>
        <div className='message-item__content__name'>
          {item.name}
          {props.statusMakeFriend && <button className='btn'>Kết bạn</button>}
        </div>
        <div className='message-item__content__message'>
          <span>{item.lassMessage?.form}</span>
          {item.lassMessage?.content}
        </div>
      </div>
      <div className='message-item__time'>
        {item.sendingTime && (
          <span>
            <Moment toNow>{item.sendingTime}</Moment>
          </span>
        )}
        {active && item.countUnreadMessage && (
          <div className='message-item__time__count'>
            +{item.countUnreadMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageUser;
