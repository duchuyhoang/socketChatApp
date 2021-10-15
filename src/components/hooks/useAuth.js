import { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import {
  CONVERSATION_SOCKET,
  MAIN_SOCKET,
  NOTIFICATION_SOCKET,
  USER_SOCKET,
  refreshSocket,
} from "../../socket/socket";
import { AuthActions, selectIsLogin } from "../../redux/reducer/auth";
import { getCookie } from "../../common/functions";
export const useAuth = (handleReconnectSocket = false) => {
  const userInfo = useSelector((state) => state.auth.user);
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
//   useEffect(() => {}, []);

  useEffect(() => {
    const accessToken = getCookie("cn11_access_token");
    if (!userInfo && accessToken) {
      dispatch(AuthActions.relogin());
    }
  }, []);

return {
    userInfo,
    isLogin
}

};
