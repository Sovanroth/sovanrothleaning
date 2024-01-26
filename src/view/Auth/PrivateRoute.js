import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, path }) => {
  const hasToken = localStorage.getItem('token');

  return hasToken ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

export default PrivateRoute;
