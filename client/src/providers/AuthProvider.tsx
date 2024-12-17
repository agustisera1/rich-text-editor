import Cookies from "js-cookie";
import { ReactNode, useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AuthContextData = {
    isLogged: !!Cookies.get("token"),
    user: {
      username: Cookies.get("username") as string,
      email: Cookies.get("email") as string,
    },
  };

  const [authData, setAuthData] = useState<AuthContextData>(initialState);

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
