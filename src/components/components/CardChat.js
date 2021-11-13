import React from 'react';
import Moment from 'react-moment';
import { MESSAGE_STATUS } from '../../common/constant';
import { Sticker } from './Sticker/Sticker';
const CardChat = ({
  type,
  children,
  createTime,
  img,
  status,
  icon,
  ...rest
}) => {
  return (
    <div
      className={`card-chat ${
        status === MESSAGE_STATUS.PENDING ? 'pending' : ''
      }${status === MESSAGE_STATUS.ERROR ? 'error' : ''}`}
    >
      {type === 0 && <p className='card-chat__text'>{children}</p>}
      {type === 1 && <img src={img} alt='' />}
      {type === 4 && (
        <p className='card-chat__text'>
          {children}
          <img src={img} alt='' />
        </p>
      )}
      {type === 2 && (
        <Sticker
          framesPerRow={icon.blocksOfHeight}
          framesPerColumn={icon.blocksOfWidth}
          src={icon.iconUrl}
          width={icon.width}
          height={icon.height}
          totalFrames={icon.totalFrames}
        />
      )}

      {createTime && (
        <span className='card-chat__time'>
          <Moment format='hh:mm' toNow>
            {createTime}
          </Moment>
        </span>
      )}
    </div>
  );
};

export default CardChat;
