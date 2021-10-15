import { Redirect, Route, Switch, useHistory } from "react-router";
import { useEffect } from "react";
import Home from "./components/pages/Home/Home";
import SignIn from "./components/pages/SignIn/SignIn";
import SignUp from "./components/pages/SignUp/SignUp";
import { login, getUserFriendList } from "./services/apiMap";
import {
  MAIN_SOCKET,
  USER_SOCKET,
  CONVERSATION_SOCKET,
  NOTIFICATION_SOCKET,
} from "./socket/socket";
import { SOCKET_EMIT_ACTIONS, SOCKET_ON_ACTIONS } from "./common/constant";
import { getCookie } from "./common/functions";
function App() {
  const history = useHistory();
  useEffect(async () => {
    // try{
    // login({password:"10032000",email:"huyred1003@gmail.com"}).then((value)=>{
    //   getUserFriendList()
    // });
    // }
    // catch(err){

    // }
    const accessToken = getCookie("cn11_access_token");
    if (accessToken) {
      // SOCKET_EMIT_ACTIONS.ON_AUTHENTICATE
      MAIN_SOCKET.emit("authenticate", {
        token: accessToken,
      });
      MAIN_SOCKET.once(SOCKET_ON_ACTIONS.AUTHEN_SUCCESS, () => {
        USER_SOCKET.disconnect();
        USER_SOCKET.connect();
        CONVERSATION_SOCKET.disconnect();
        CONVERSATION_SOCKET.connect();
        NOTIFICATION_SOCKET.disconnect();
        NOTIFICATION_SOCKET.connect();

USER_SOCKET.on(SOCKET_ON_ACTIONS.SOCKET_READY,()=>{
  // Set up a redux variable for this user socket has been ready to use same with conversation and notification
})

      });

      MAIN_SOCKET.once(SOCKET_ON_ACTIONS.AUTHEN_FAIL, () => {
        history.push("/login");
      });
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/home">
          <Redirect to="/" />
        </Route>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
