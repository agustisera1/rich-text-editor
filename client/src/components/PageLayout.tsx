import React, { PropsWithChildren } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router";
import { paths } from "../constants";

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { logOut, user, isLogged } = useAuth();
  const navigate = useNavigate();
  const handleNavClick = () => {
    if (isLogged) navigate(paths.documents);
  };

  return (
    <div className="page-layout">
      <nav className="navbar">
        <p onClick={handleNavClick} className="nav-title">
          Nolte docs
        </p>
        {isLogged && user?.username && (
          <button className="nav-button primary" onClick={logOut}>
            {user.email.slice(0, 1).toUpperCase()}
          </button>
        )}
      </nav>
      <div className="page-content">{children}</div>
    </div>
  );
};
