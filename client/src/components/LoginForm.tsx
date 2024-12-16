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
  const { logUser } = useAuth();
  const [loginStatus, setLoginStatus] =
    useState<ServiceResponse<null>>(initialState);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username && password) {
      setLoginStatus({ ...loginStatus, pending: true });
      const response = await logUser({ username, password });
      setLoginStatus({ ...response, pending: false });
    }
  };

  useEffect(() => {
    const { success, error } = loginStatus;
    if (success) navigate(paths.documents);
    if (error) {
      alert("User unauthorized");
    }
    return () => setLoginStatus(initialState);
  }, [loginStatus, navigate]);

  return (
    <section className="card">
      <p>Please enter your username and password to log in.</p>
      <input ref={usernameRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button className="primary" onClick={handleLogin} disabled={false}>
        {loginStatus.pending ? "..." : "Login"}
      </button>
    </section>
  );
};
