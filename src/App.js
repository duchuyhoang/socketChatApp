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

function App() {
  const loading = useSelector((state) => state.ui.isLoading);
  const notification = useSelector(selectNotification);
  const notifyRef = useRef(null);

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
        <Route path='*'>
          <Redirect to='home' />
        </Route>
      </Switch>
    </>
  );
}

export default App;
