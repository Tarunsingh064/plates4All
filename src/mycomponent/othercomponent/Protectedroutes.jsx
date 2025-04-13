import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/Authcontext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;

    if (isAuthenticated){
        return <Navigate to="/" replace/>;
    }
  }

  // If logged in, show the requested page
  return children;
};

export default ProtectedRoute;
