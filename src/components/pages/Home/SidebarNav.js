import React, { useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import woman from '../../../assets/images/woman.png';
import UpdateProfile from '../../components/UpdateProfile';
import Avatar from '../../shared/Avatar';
import Modal from '../../shared/Modal';
import Popover from '../../shared/Popover';
import SVGIcon from '../../shared/SVGIcon';
import TabsRoute from './TabsRoute';
import man from '../../../assets/images/man.png';

const userProfile = {
  avatar: man,
  userName: 'Hòa Ngô',
  email: 'ngotrihoa@gmail.com',
  phone: '0192222999',
  gender: 0,
};

const SidebarNav = (props) => {
  const { url, path } = useRouteMatch();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className='sidebar-nav'>
      <div className='sidebar-nav__tab'>
        <div className='sidebar-nav__tab__item'>
          <Popover
            root={<Avatar img={woman} isOnline={true} size='l' />}
            type='v1'
          >
            <ul className='avatar-popover'>
              <li onClick={() => setOpenProfile(true)}>
                <SVGIcon name='user' />
                <span>Tài Khoản</span>
              </li>
              <li className='hight-light'>
                <SVGIcon name='signout' />
                <span>Đăng xuất</span>
              </li>
            </ul>
          </Popover>
        </div>
        <div className='sidebar-nav__tab__item'>
          <nav>
            <NavLink to={`${url}/message`} activeClassName='active'>
              <SVGIcon name='message' width='24px' />
            </NavLink>
            <NavLink to={`${url}/list-friend`}>
              <SVGIcon name='book' width='24px' />
            </NavLink>
          </nav>
        </div>
      </div>
      <div className='sidebar-nav__content'>
        <Switch>
          <Route path={`${path}/:tab`} component={TabsRoute} />
        </Switch>
      </div>

      {openProfile && (
        <Modal
          onClose={() => {
            setOpenProfile(false);
          }}
        >
          <UpdateProfile
            profile={userProfile}
            onClose={() => {
              setOpenProfile(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default SidebarNav;
