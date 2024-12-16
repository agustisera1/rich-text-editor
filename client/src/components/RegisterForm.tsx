import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks";
import { ServiceResponse } from "@api";
import { paths } from "../constants";
import { useNavigate } from "react-router";

const initialState = {
  error: null,
  success: false,
  pending: false,
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const [registerStatus, setRegisterStatus] =
    useState<ServiceResponse<null>>(initialState);

  const createUsernameRef = useRef<HTMLInputElement | null>(null);
  const createEmailRef = useRef<HTMLInputElement | null>(null);
  const createPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const username = createUsernameRef.current?.value;
    const password = createPasswordRef.current?.value;
    const email = createEmailRef.current?.value;
    if (username && password && email) {
      setRegisterStatus({ ...registerStatus, pending: true });
      const response = await createUser({ username, password, email });
      setRegisterStatus({ ...response, pending: false });
    }
  };

  useEffect(() => {
    const { error, success } = registerStatus;
    if (success) {
      alert("User created!");
      navigate(paths.login);
    }

    if (error) alert("Could not register the user.");

    return () => setRegisterStatus(initialState);
  }, [registerStatus, navigate]);

  return (
    <form onSubmit={handleRegister} className="card">
      <p>Create your account</p>
      <input
        ref={createUsernameRef}
        required
        type="text"
        placeholder="username"
      />
      <input
        ref={createEmailRef}
        required
        type="email"
        placeholder="me@email.com"
      />
      <input
        ref={createPasswordRef}
        required
        type="password"
        placeholder="password"
      />

      <button
        disabled={registerStatus.pending}
        type="submit"
        className="primary"
      >
        {registerStatus.pending ? "..." : "Register"}
      </button>
    </form>
  );
};
