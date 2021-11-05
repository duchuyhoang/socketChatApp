import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin } = useAuth();
  const isRelogin = useSelector((state) => state.auth.isRelogin);

  return (
    <Route
      {...rest}
      render={() =>
        isLogin || isRelogin ? <Component /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
