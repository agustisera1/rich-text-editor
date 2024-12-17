import Cookies from "js-cookie";
import {
  logUser as logUserService,
  logOut as logOutUserService,
  createUser,
} from "@api";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

/**
 *
 * This hook provides methods to log in, log out, and create a user. It also provides
 * the current authentication state and user information.
 *
 * @returns {object} An object containing:
 * - `user`: The current user information (username and email).
 * - `isLogged`: A boolean indicating if the user is logged in.
 * - `logUser`: A function to log in a user with given credentials.
 * - `logOut`: A function to log out the current user.
 * - `createUser`: A function to create a new user.
 *
 * @throws {Error} If the hook is used outside of an AuthProvider.
 */
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
