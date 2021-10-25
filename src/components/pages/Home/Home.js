import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useRouteMatch } from 'react-router';
import { ConversationAction } from '../../../redux/reducer/conversation';
import { UserAction } from '../../../redux/reducer/user';
import Helmet from '../../components/Helmet';
import Main from './Main';
import SidebarNav from './SidebarNav';

function Home(props) {
  const { path } = useRouteMatch();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserAction.getListFriend());
  }, [dispatch]);

  useEffect(() => {
    dispatch(ConversationAction.getConversation());
  }, [dispatch]);

  return (
    <Helmet title='Home'>
      <div className='container'>
        <SidebarNav />
        <Route path={`${path}/message/:idConversation`} component={Main} />
      </div>
    </Helmet>
  );
}

export default Home;
