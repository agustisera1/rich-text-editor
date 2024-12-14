import { useEffect, useRef } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { logUser, isLogged } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isLogged) navigate("/documents");
  }, [isLogged, navigate]);

  const handleLogin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username && password) await logUser({ username, password });
  };

  return (
    <div>
      <input ref={usernameRef} type="text" placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button onClick={handleLogin} disabled={false}>
        Login user
      </button>
    </div>
  );
};
