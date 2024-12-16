import React, { PropsWithChildren } from "react";
import { useAuth } from "../hooks";
import { useLocation, useNavigate } from "react-router";
import { paths } from "../constants";

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { logOut, user, isLogged } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = () => {
    if (isLogged && location.pathname !== paths.documents)
      navigate(paths.documents);
  };

  const handleAvatarClick = () => {
    if (confirm("Log out?")) logOut();
  };

  return (
    <div className="page-layout">
      <nav className="navbar">
        <p onClick={handleNavClick} className="nav-title">
          Nolte docs
        </p>
        {isLogged && user?.username && (
          <button className="nav-button primary" onClick={handleAvatarClick}>
            {user.email.slice(0, 1).toUpperCase()}
          </button>
        )}
      </nav>
      <div className="page-content">{children}</div>
    </div>
  );
};
