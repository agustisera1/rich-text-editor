import Cookies from "js-cookie";
import {
  logUser as logUserService,
  logOut as logOutUserService,
  createUser,
} from "../api/services";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

/** useAuth: Normally, we would use a framework to handle auth */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  const logUser = async (credentials: Parameters<typeof logUserService>[0]) => {
    const serviceResponse = await logUserService(credentials);
    const username = Cookies.get("username") as string;
    const email = Cookies.get("email") as string;
    context.setAuthData({
      isLogged: serviceResponse.success,
      user: { username, email },
    });

    return serviceResponse;
  };

  const logOut = () => {
    const username = Cookies.get("username") as string;
    logOutUserService(username);
    context.setAuthData({
      isLogged: false,
      user: null,
    });
  };

  return {
    user: context.user,
    isLogged: context.isLogged,
    logUser,
    logOut,
    createUser,
  };
};
