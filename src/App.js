import { Redirect, Route, Switch, useHistory } from 'react-router';
import { useEffect } from 'react';
import Home from './components/pages/Home/Home';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import { login, getUserFriendList } from './services/apiMap';
import {
  MAIN_SOCKET,
  USER_SOCKET,
  CONVERSATION_SOCKET,
  NOTIFICATION_SOCKET,
} from './socket/socket';
import { SOCKET_EMIT_ACTIONS, SOCKET_ON_ACTIONS } from './common/constant';
import { getCookie } from './common/functions';
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/reducer/auth';
import { useAuth } from './components/hooks/useAuth';
import { useSocketConnection } from './components/hooks/useSocketConnection';
function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const authInfos = useAuth();
  const socketConnectionStatus = useSocketConnection();

  useEffect(() => {
    console.log(socketConnectionStatus);
  }, [socketConnectionStatus]);

  const login = () => {
    dispatch(
      AuthActions.loginRequest({
        password: '10032000',
        email: 'huyred1003@gmail.com',
      })
    );
  };
  return (
    <div>
      <button onClick={login}>Login in</button>
      <Switch>
        <Route path='/home'>
          <Redirect to='/' />
        </Route>
        <Route path='/login' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
