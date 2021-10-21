import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (isLogin ? <Component /> : <Redirect to='/login' />)}
    />
  );
};

export default PrivateRoute;
