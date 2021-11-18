import {
  FRIEND_STATUS,
  MESSAGE_STATUS,
  MESSAGE_TYPE,
  NOTIFICATION_STATUS,
} from './constant';

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  if(!base64Url) return null;
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export function checkTokenValid(accessToken) {
  if (accessToken) {
    const parsedToken = parseJwt(accessToken);
    const now = Date.now();
    return parsedToken.exp * 1000 > now ? true : false;
  } else return false;
}

export const transformListMessages = (listMessages) => {
  if (!listMessages || listMessages.length < 1) return [];
  return listMessages
    .sort(
      (a, b) => new Date(a.message_create_at) - new Date(b.message_create_at)
    )
    .reduce((prev, cur) => {
      const lastPrev = prev.at(-1);
      if (lastPrev && +cur.id_user === lastPrev.idUser) {
        lastPrev.messages.push({
          _type: +cur._type,
          idMessage: +cur.id_message,
          content: cur.content,
          url: cur.url,
          icon: cur.icon,
          status: cur.status ?? MESSAGE_STATUS.FULFILLED,
        });
        lastPrev.createAt = cur.message_create_at;
      } else {
        prev.push({
          idUser: +cur.id_user,
          avatar: cur.avatar,
          gender: +cur.sex,
          messages: [
            {
              _type: +cur._type,
              idMessage: +cur.id_message,
              content: cur.content,
              url: cur.url,
              icon: cur.icon,
              status: cur.status ?? MESSAGE_STATUS.FULFILLED,
            },
          ],
          createAt: cur.message_create_at,
        });
      }
      return prev;
    }, []);
};

export const getTypeMessage = (text = '', images = [], icon = null) => {
  if (icon) return MESSAGE_TYPE.ICON;
  if (text !== '') {
    if (images?.length > 0) return MESSAGE_TYPE.TEXT_AND_IMAGE;
    return MESSAGE_TYPE.TEXT;
  } else {
    if (images?.length > 0) return MESSAGE_TYPE.IMAGE;
    return -1;
  }
};

export const getMessageById = (list, id) => {
  return list.filter((item) => item.id === id);
};

export const getFriendStatus = (can_make_friend, friendStatus) => {
  if (friendStatus === null) friendStatus = 0;
  if (can_make_friend === 1 && friendStatus === 0) return FRIEND_STATUS.STRANGE;
  if (can_make_friend === 0 && friendStatus === 0) return FRIEND_STATUS.PENDING;
  if (can_make_friend === 0 && friendStatus === 1) return FRIEND_STATUS.FRIEND;
  if ((can_make_friend === 0 || can_make_friend === 1) && friendStatus === -1)
    return FRIEND_STATUS.BLOCK;
  return 1;
};

export const getContentNotification = (author, dataNotification) => {
  //Author
  // if (author.id_user === dataNotification.id_owner) {
  //   if (dataNotification.status === NOTIFICATION_STATUS.FULFILLED) {
  //     return {
  //       content: `${dataNotification.ownerName} đã chấp nhận lời mời kết bạn của bạn 💕`,
  //       imgSrc: dataNotification.ownerAvatar,
  //       createAt: dataNotification.createAt,
  //     };
  //   }
  // }

  // //from other users
  // if (author.id_user !== dataNotification.id_receiver) {
  //   if (dataNotification.status === NOTIFICATION_STATUS.PENDING)
  //     return {
  //       content: `${dataNotification.ownerName} đã gửi cho bạn lời mời kết bạn 👏`,
  //       imgSrc: dataNotification.ownerAvatar,
  //       createAt: dataNotification.createAt,
  //     };
  //   else if (dataNotification.status === NOTIFICATION_STATUS.FULFILLED)
  //     return {
  //       content: `Bạn đã chấp nhận lời mời kết bạn của ${dataNotification.ownerName} 💕`,
  //       imgSrc: dataNotification.ownerAvatar,
  //       createAt: dataNotification.createAt,
  //     };
  // }

  //add friend
  if (dataNotification.type === 1) {
    if (dataNotification.status === 0)
      return {
        content: `${dataNotification.ownerName} đã gửi cho bạn lời mời kết bạn 👏`,
        imgSrc: dataNotification.ownerAvatar,
        createAt: dataNotification.createAt,
      };

    if (dataNotification.status === 1) {
      if (author.id_user === dataNotification.id_receiver)
        return {
          content: `${dataNotification.ownerName} đã chấp nhận lời mời kết bạn của bạn 💕`,
          imgSrc: dataNotification.ownerAvatar,
          createAt: dataNotification.createAt,
        };
      else
        return {
          content: `Bạn đã chấp nhận lời mời kết bạn của ${dataNotification.receiverName} 💕`,
          imgSrc: dataNotification.receiverAvatar,
          createAt: dataNotification.createAt,
        };
    }
  }

  return {
    content: 'Bạn có một thông báo mới 🎁',
    imgSrc: dataNotification.ownerAvatar,
    createAt: dataNotification.createAt,
  };
};
