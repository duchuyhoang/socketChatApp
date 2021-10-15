import React from 'react';
import Helmet from '../../components/Helmet';
import Main from './Main';
import SidebarNav from './SidebarNav';

function Home(props) {
  return (
    <Helmet title='Home'>
      <div className='container'>
        <SidebarNav />
        <main className='main'>
          <Main />
        </main>
      </div>
    </Helmet>
  );
}

export default Home;
