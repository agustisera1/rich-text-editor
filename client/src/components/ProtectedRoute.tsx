import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { paths } from "../constants";

export const ProtectedRoute: FC<PropsWithChildren & { path?: string }> = ({
  children,
  path = paths.login,
}) => {
  const { isLogged } = useAuth();
  return isLogged ? children : <Navigate to={path} />;
};
