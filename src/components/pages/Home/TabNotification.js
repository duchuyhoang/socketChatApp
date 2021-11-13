import React from 'react';
import { useSelector } from 'react-redux';
import NotificationItem from '../../components/NotificationItem';

const TabNotification = () => {
  const notifications = useSelector((state) => state.notification.notification);
  if (!notifications || notifications.length < 1)
    return (
      <p
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '16px',
          marginTop: '2rem',
        }}
      >
        Không có thông báo nào
      </p>
    );
  return (
    <ul>
      {notifications.map((item) => (
        <li key={item.id_notification}>
          <NotificationItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default TabNotification;
