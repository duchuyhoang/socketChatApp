import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SOCKET_EMIT_ACTIONS, SOCKET_ON_ACTIONS } from '../common/constant';
import {
  selectIsLogin,
  selectSocketConnectionSuccess,
} from '../redux/reducer/auth';
import { AuthActions } from '../redux/reducer/auth';
import {
  MAIN_SOCKET,
  USER_SOCKET,
  CONVERSATION_SOCKET,
  NOTIFICATION_SOCKET,
} from '../socket/socket';
import { refreshSocket } from '../socket/socket';
import { checkTokenValid } from '../common/functions';

export const useSocketConnection = () => {
  const socketLists = useSelector((state) => state.auth.socketReadyFlags);
  const isLogin = useSelector(selectIsLogin);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const socketConnectSuccess = useSelector(selectSocketConnectionSuccess);
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken && checkTokenValid(accessToken)) {
      // SOCKET_EMIT_ACTIONS.ON_AUTHENTICATE
      MAIN_SOCKET.emit(SOCKET_EMIT_ACTIONS.ON_AUTHENTICATE, {
        token: accessToken,
      });
      MAIN_SOCKET.once(SOCKET_ON_ACTIONS.AUTHEN_SUCCESS, () => {
        USER_SOCKET.disconnect();
        CONVERSATION_SOCKET.disconnect();
        NOTIFICATION_SOCKET.disconnect();

        USER_SOCKET.connect();
        NOTIFICATION_SOCKET.connect();
        CONVERSATION_SOCKET.connect();

        USER_SOCKET.on(SOCKET_ON_ACTIONS.SOCKET_READY, () => {
          dispatch(AuthActions.setUserSocketReady());
        });
        NOTIFICATION_SOCKET.on(SOCKET_ON_ACTIONS.SOCKET_READY, () => {
          dispatch(AuthActions.setNotificationSocketReady());
        });
        CONVERSATION_SOCKET.on(SOCKET_ON_ACTIONS.SOCKET_READY, () => {
          dispatch(AuthActions.setConversationSocketReady());
        });
      });

      MAIN_SOCKET.once(SOCKET_ON_ACTIONS.AUTHEN_FAIL, () => {
        refreshSocket();
        // history.push("/login");
      });
    } else {
      //   history.push("/login");
    }

    return () => {
      refreshSocket();
    };
  }, [accessToken]);

  useEffect(() => {
    // Do something make loading hide etc
    if (socketConnectSuccess) {
    }
  }, [socketConnectSuccess]);

  return socketConnectSuccess;
};
