import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ component: Component }) => {
  const { user } = useContext(UserContext);

  return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
