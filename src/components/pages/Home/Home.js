import React from 'react';
import { Route, useRouteMatch } from 'react-router';
import Helmet from '../../components/Helmet';
import Main from './Main';
import SidebarNav from './SidebarNav';

function Home(props) {
  const { path } = useRouteMatch();
  return (
    <Helmet title='Home'>
      <div className='container'>
        <SidebarNav />
        <Route path={`${path}/message/:idMessage`} component={Main} />
      </div>
    </Helmet>
  );
}

export default Home;
