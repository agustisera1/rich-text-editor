import Cookies from "js-cookie";
import { logUser, createUser } from "../api/services";

/** useAuth: Normally, we would use a framework to handle auth */
export const useAuth = () => {
  const isLogged = !!Cookies.get("token");
  return {
    isLogged,
    logUser,
    createUser,
  };
};
