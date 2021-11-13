import React from 'react';
import Avatar from '../shared/Avatar';
import Moment from 'react-moment';
import man from '../../assets/images/man.png';
import woman from '../../assets/images/woman.png';
import { useDispatch } from 'react-redux';
import { UserAction } from '../../redux/reducer/user';
import { FRIEND_STATUS } from '../../common/constant';
import { getFriendStatus } from '../../common/functions';
import { useSelector } from 'react-redux';
import SpinLoading from '../shared/SpinLoading';

const MessageUser = (props) => {
  const { item } = props;
  const active = item.countUnreadMessage > 0;
  const avatar = item.avatar ? item.avatar : item.sex === 0 ? man : woman;

  const addFriendLoading = useSelector((state) => state.user.isUserLoading);

  const statusMakeFriend = getFriendStatus(
    item.can_make_friend_request,
    item.friendStatus
  );

  const dispatch = useDispatch();
  const handleAddFriend = (user) => {
    const formData = new FormData();
    formData.append('type', 1);
    formData.append('id_receiver', user.id_user);
    dispatch(
      UserAction.sendRequestAddFriend({ data: formData, idUser: user.id_user })
    );
  };
  let btnFriendStatus;
  if (statusMakeFriend === FRIEND_STATUS.STRANGE) {
    btnFriendStatus = (
      <button className='btn' onClick={() => handleAddFriend(item)}>
        Kết bạn
        {addFriendLoading && <SpinLoading size='20px' />}
      </button>
    );
  } else if (statusMakeFriend === FRIEND_STATUS.PENDING) {
    btnFriendStatus = <button className='btn pending'>Chờ xác nhận...</button>;
  }

  return (
    <div className={`message-item ${active ? 'active' : ''}`}>
      <div className='message-item__avatar'>
        <Avatar img={avatar} isOnline={true} />
      </div>
      <div className={`message-item__content ${active ? 'hight-light' : ''}`}>
        <div className='message-item__content__name'>
          {item.name}
          {btnFriendStatus}
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
