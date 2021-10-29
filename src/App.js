import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Home from './components/pages/Home/Home';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import LoadingFullScreen from './components/shared/LoadingFullScreen';
import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/shared/Snackbar';
import { selectNotification } from './redux/reducer/ui';
import { useEffect, useRef } from 'react';
import ChatVideo from "./components/pages/ChatVideo/ChatVideo"
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
  const loading = useSelector((state) => state.ui.isLoading);
  const notification = useSelector(selectNotification);
  const notifyRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!notifyRef.current) return;
    notifyRef.current.showSnackbar();
  }, [notification]);

  return (
    <>
      {loading && <LoadingFullScreen />}
      {notification && (
        <Snackbar
          message={notification.message}
          type={notification.status}
          ref={notifyRef}
        />
      )}

      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <PrivateRoute path='/home' component={Home} />
        <Route path='/login' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/call/:id_conversation' component={ChatVideo} />
        <Route path='*'>
          <Redirect to='home' />
        </Route>
        
        <Route path='/' component={Home} />
       

      </Switch>
    </>
  );
}

export default App;
