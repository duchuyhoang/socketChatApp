import React from 'react';
import Moment from 'react-moment';

const CardChat = ({ type, children, createTime, img, ...rest }) => {
  return (
    <div className='card-chat'>
      {type === 0 && <p className='card-chat__text'>{children}</p>}
      {type === 1 && <img src={img} alt='' />}
      {type === 4 && (
        <p className='card-chat__text'>
          {children}
          <img src={img} alt='' />
        </p>
      )}
      {createTime && (
        <span className='card-chat__time'>
          <Moment toNow>{createTime}</Moment>
        </span>
      )}
    </div>
  );
};

export default CardChat;
