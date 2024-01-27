import React from "react";
import { useAuth } from "../providers/authProvider";
import { Navigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const { user } = useAuth();
  if (user.isAuthenticated) return <Navigate to="/panel" replace />;
  else return <Navigate to="/login" replace />;
  return <div>{children}</div>;
};

export default DefaultLayout;
