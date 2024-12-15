import React, { PropsWithChildren } from "react";
import "../Home.css";
import { useAuth } from "../hooks";

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { logOut, user, isLogged } = useAuth();

  return (
    <div className="page-layout">
      <nav className="navbar">
        <h1 className="navbar-title">Page Title</h1>
        {isLogged && user?.username && (
          <button className="primary" onClick={logOut}>
            LogOut
          </button>
        )}
      </nav>
      <div className="content">{children}</div>
    </div>
  );
};
