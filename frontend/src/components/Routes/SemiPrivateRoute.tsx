import React from "react";
import { useAuth } from "../../contexts/AuthContext";

type SemiPrivateRouteProps = {
  privateChildren: React.ReactNode;
  publicChildren: React.ReactNode;
};
export const SemiPrivateRoute: React.FC<SemiPrivateRouteProps> = ({
  privateChildren,
  publicChildren,
}) => {
  const { auth } = useAuth();

  return auth.client ? privateChildren : publicChildren;
};
