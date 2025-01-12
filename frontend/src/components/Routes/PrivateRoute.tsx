import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type PrivateRouteProps = {
  redirectTo?: string;
  children?: React.ReactNode;
};
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/",
  children,
}) => {
  const { auth } = useAuth();

  if (!auth.client) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
