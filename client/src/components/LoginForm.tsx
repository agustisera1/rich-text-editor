import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router";
import { ServiceResponse } from "@api";
import { paths } from "../constants";

const initialState: ServiceResponse<null> = {
  success: false,
  error: null,
  pending: false,
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { logUser, isLogged } = useAuth();
  const [loginStatus, setLoginStatus] =
    useState<ServiceResponse<null>>(initialState);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username && password) {
      setLoginStatus({ ...loginStatus, pending: true });
      const response = await logUser({ username, password });
      setLoginStatus({ ...response, pending: false });
    }
  };

  useEffect(() => {
    if (isLogged) navigate(paths.documents);
  }, [isLogged, navigate]);

  useEffect(() => {
    const { success, error } = loginStatus;
    if (success) navigate(paths.documents);
    if (error) {
      alert("User unauthorized");
    }
    return () => setLoginStatus(initialState);
  }, [loginStatus, navigate]);

  return (
    <>
      <h1>Nolte docs</h1>
      <form onSubmit={handleLogin} className="card">
        <p>Please enter your username and password to log in.</p>
        <input
          required
          className="editor-input form-input"
          ref={usernameRef}
          type="text"
          placeholder="username"
        />
        <input
          required
          className="editor-input form-input"
          ref={passwordRef}
          type="password"
          placeholder="password"
        />
        <button type="submit" className="primary" disabled={false}>
          {loginStatus.pending ? "..." : "Login"}
        </button>
      </form>
    </>
  );
};
