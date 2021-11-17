import { MESSAGE_STATUS, MESSAGE_TYPE } from "./constant";

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
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
          idMessage: cur.id_message,
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
              idMessage: cur.id_message,
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

export const getTypeMessage = (text = "", images = [], icon = null) => {
  if (icon) return MESSAGE_TYPE.ICON;
  if (text !== "") {
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
