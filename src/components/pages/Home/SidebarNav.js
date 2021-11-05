import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import man from '../../../assets/images/man.png';
import woman from '../../../assets/images/woman.png';
import { AuthActions, selectUser } from '../../../redux/reducer/auth';
import { UiActions } from '../../../redux/reducer/ui';
import UpdateProfile from '../../components/UpdateProfile';
import Avatar from '../../shared/Avatar';
import Modal from '../../shared/Modal';
import Popover from '../../shared/Popover';
import SVGIcon from '../../shared/SVGIcon';
import TabsRoute from './TabsRoute';

const SidebarNav = (props) => {
  const { url, path } = useRouteMatch();
  const [openProfile, setOpenProfile] = useState(false);
  const userProfile = useSelector(selectUser);
  const avatar = userProfile.avatar
    ? userProfile.avatar
    : userProfile.sex
    ? woman
    : man;
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(AuthActions.signOut());
    dispatch(
      UiActions.notificationSuccess({ message: 'Đăng xuất thành công!' })
    );
  };

  return (
    <div className='sidebar-nav'>
      <div className='sidebar-nav__tab'>
        <div className='sidebar-nav__tab__item'>
          <Popover
            root={<Avatar img={avatar} isOnline={true} size='l' />}
            type='v1'
          >
            <ul className='avatar-popover'>
              <li onClick={() => setOpenProfile(true)}>
                <SVGIcon name='user' />
                <span>Tài Khoản</span>
              </li>
              <li className='hight-light' onClick={handleSignOut}>
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
          <Route exact path={`${path}`}>
            <Redirect to={`${path}/message`} />
          </Route>
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
