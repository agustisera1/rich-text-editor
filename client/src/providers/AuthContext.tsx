import { createContext, Dispatch } from "react";

export type User = { username: string; email: string } | null;
export type AuthContextData = { isLogged: boolean; user: User };
export type AuthContextType = {
  isLogged: boolean;
  user: User;
  setAuthData: Dispatch<AuthContextData>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
