import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET_EMIT_ACTIONS, SOCKET_ON_ACTIONS } from '../common/constant';
import { checkTokenValid } from '../common/functions';
import {
  selectSocketConnectionSuccess,
  SocketActions,
} from '../redux/reducer/socket';
import { UiActions } from '../redux/reducer/ui';
import {
  CONVERSATION_SOCKET,
  MAIN_SOCKET,
  NOTIFICATION_SOCKET,
  refreshSocket,
  USER_SOCKET,
} from '../socket/socket';

export const useSocketConnection = () => {
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
          dispatch(SocketActions.setUserSocketReady());
        });
        NOTIFICATION_SOCKET.on(SOCKET_ON_ACTIONS.SOCKET_READY, () => {
          dispatch(SocketActions.setNotificationSocketReady());
        });
        CONVERSATION_SOCKET.on(SOCKET_ON_ACTIONS.SOCKET_READY, () => {
          dispatch(SocketActions.setConversationSocketReady());
        });
      });

      MAIN_SOCKET.once(SOCKET_ON_ACTIONS.AUTHEN_FAIL, () => {
        refreshSocket();
        // history.push("/login");
      });
    } else {
      //   history.push("/login");
      console.log('socket connect fail!');
    }

    return () => {
      refreshSocket();
    };
  }, [accessToken, dispatch]);

  useEffect(() => {
    // Do something make loading hide etc
    if (socketConnectSuccess) {
      dispatch(
        UiActions.notificationSuccess({ message: 'Socket loading succeed!' })
      );
    } else {
      dispatch(
        UiActions.notificationWarning({ message: 'Wait Socket loading....' })
      );
    }
  }, [socketConnectSuccess, dispatch]);

  return socketConnectSuccess;
};
