import React, { PropsWithChildren } from "react";
import "../Home.css";

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="page-layout">
      <nav className="navbar">
        <h1 className="navbar-title">Page Title</h1>
      </nav>
      <div className="content">{children}</div>
    </div>
  );
};
