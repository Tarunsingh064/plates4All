import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/Authcontext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // 🔒 Already logged in? Send to home page
    return <Navigate to="/" replace />;
  }

  // ✅ Not logged in? Show login/signup page
  return children;
};

export default PublicRoute;
