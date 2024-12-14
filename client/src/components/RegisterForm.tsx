import { useRef } from "react";
import { useAuth } from "../hooks";

export const RegisterForm = () => {
  const { createUser } = useAuth();

  const createUsernameRef = useRef<HTMLInputElement | null>(null);
  const createEmailRef = useRef<HTMLInputElement | null>(null);
  const createPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleRegister = async () => {
    const username = createUsernameRef.current?.value;
    const password = createPasswordRef.current?.value;
    const email = createEmailRef.current?.value;
    if (username && password && email)
      await createUser({ username, password, email });
  };

  return (
    <div>
      <fieldset>
        <input ref={createUsernameRef} type="text" placeholder="username" />
        <input ref={createEmailRef} type="email" placeholder="me@email.com" />
        <input ref={createPasswordRef} type="password" placeholder="password" />
      </fieldset>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
