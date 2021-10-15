import React from 'react';
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom';
import woman from '../../../assets/images/woman.png';
import Avatar from '../../shared/Avatar';
import SVGIcon from '../../shared/SVGIcon';

const SidebarNav = (props) => {
  const { url, path } = useRouteMatch();

  return (
    <div className='sidebar-nav'>
      <div className='sidebar-nav__tab'>
        <div className='sidebar-nav__tab__item'>
          <Avatar img={woman} isOnline={true} size='l' />
        </div>
        <div className='sidebar-nav__tab__item'>
          <nav>
            <NavLink to={`${url}message`} activeClassName='active'>
              <SVGIcon name='message' width='24px' />
            </NavLink>
            <NavLink to={`${url}book`}>
              <SVGIcon name='book' width='24px' />
            </NavLink>
          </nav>
        </div>
      </div>
      <div className='sidebar-nav__content'>
        <Switch>
          <Route path={`${path}:tab`} render={() => <div>hello</div>} />
        </Switch>
      </div>
    </div>
  );
};

export default SidebarNav;
