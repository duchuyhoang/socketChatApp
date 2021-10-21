import React from 'react';
import Moment from 'react-moment';

const CardChat = (props) => {
  return (
    <div className='card-chat'>
      <p className='card-chat__text'>{props.children}</p>
      <span className='card-chat__time'>
        <Moment toNow>{props.createTime}</Moment>
      </span>
    </div>
  );
};

export default CardChat;
