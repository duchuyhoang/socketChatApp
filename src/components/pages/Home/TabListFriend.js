import React from 'react';
import { useSelector } from 'react-redux';
import { selectListFriend } from '../../../redux/reducer/user';
import MessageUser from '../../components/MessageUser';
const TabListFriend = (props) => {
  const listFriend = useSelector(selectListFriend);
  if (!listFriend || listFriend.length < 1)
    return (
      <p
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '16px',
          marginTop: '2rem',
        }}
      >
        Chưa có bạn nào!
      </p>
    );
  return (
    <ul>
      {listFriend.map((item) => (
        <li key={item.id_user}>
          <MessageUser item={item} />
        </li>
      ))}
    </ul>
  );
};

export default TabListFriend;
