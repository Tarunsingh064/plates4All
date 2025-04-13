/*
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/Authcontext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
*/

import React from 'react'

function ProtectedRoute() {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default ProtectedRoute
