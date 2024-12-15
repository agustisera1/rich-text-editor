import { ReactNode, useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthContextData>({
    isLogged: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
