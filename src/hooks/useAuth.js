import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../common/functions';
import { AuthActions, selectIsLogin } from '../redux/reducer/auth';
export const useAuth = (handleReconnectSocket = false) => {
  const userInfo = useSelector((state) => state.auth.user);
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  //   useEffect(() => {}, []);

  useEffect(() => {
    const accessToken = getCookie('cn11_access_token');
    if (!userInfo && accessToken) {
      dispatch(AuthActions.relogin());
    }
  }, [dispatch, userInfo]);

  return {
    userInfo,
    isLogin,
  };
};
