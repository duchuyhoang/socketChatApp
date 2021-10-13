import { Redirect, Route, Switch } from 'react-router';
import Home from './components/pages/Home/Home';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/home'>
          <Redirect to='/' />
        </Route>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
