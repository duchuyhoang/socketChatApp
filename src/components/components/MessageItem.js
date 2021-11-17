import React, { useMemo } from 'react';
import Avatar from '../shared/Avatar';
import Moment from 'react-moment';
import man from '../../assets/images/man.png';
import woman from '../../assets/images/woman.png';
import { CONVERSATION_TYPE, MESSAGE_TYPE } from '../../common/constant';
import { useSelector } from 'react-redux';

const ListAvatar = ({ listAvatar }) => {
  const userInfo = useSelector((state) => state.auth.user);
  // const newListAvatar=useMemo(listAvatar.slice(0,listAvatar.length-2))
  return (
    <>
      <div className='list-avatar-wrapper'>
        <img className='avatar avatar--sm' src={listAvatar[0]} />
        <img className='avatar avatar--sm' src={userInfo.avatar} />
      </div>
    </>
  );
};

const MessageItem = (props) => {
  const { item } = props;
  console.log('🚀 ~ item', item);
  const active = item.countUnreadMessage > 0;
  const avatar = item.avatar ? item.avatar : item.sex === 0 ? man : woman;

  // console.log(props);
  const listAvatar = useMemo(() => {
    const listAvatar =
      item.listAvatar?.map((_avatar) => (!_avatar ? man : _avatar)) || [];

    // listAvatar.splice(listAvatar.findIndex((_avatar) => _avatar === avatar),1);
    return listAvatar;
  }, [avatar]);

  return (
    <div className={`message-item ${active ? 'active' : ''}`}>
      <div className='message-item__avatar'>
        {item.type === CONVERSATION_TYPE.SINGLE ? (
          <Avatar img={item.next_user_avatar||(item.next_user_sex?.toString()==="0" ? man : woman)} isOnline={true} />
        ) : (
          <ListAvatar listAvatar={listAvatar} />
        )}
      </div>
      <div className={`message-item__content ${active ? 'hight-light' : ''}`}>
        <div className='message-item__content__name'>
          {item.type === CONVERSATION_TYPE.SINGLE
            ? item.nextUserName
            : item.title}
          {props.statusMakeFriend && <button className='btn'>Kết bạn</button>}
        </div>
        <div className='message-item__content__message'>
          {/* <span>{item.lassMessage?.form}</span> */}

          <span>
            {item.message_count > 0
              ? item.last_message_type === MESSAGE_TYPE.TEXT
                ? item.last_message
                : item.last_message_type === MESSAGE_TYPE.IMAGE ||
                  item.last_message_type === MESSAGE_TYPE.ICON
                ? 'Ảnh mới'
                : ''
              : item.type === CONVERSATION_TYPE.SINGLE
              ? 'Hai bạn hãy trò chuyện với nhau'
              : 'Các bạn hãy trò chuyện với nhau'}
          </span>
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

export default MessageItem;
