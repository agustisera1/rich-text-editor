import { useRef } from "react";
import { useAuth } from "../hooks";

export const RegisterForm = () => {
  const { createUser } = useAuth();

  const createUsernameRef = useRef<HTMLInputElement | null>(null);
  const createEmailRef = useRef<HTMLInputElement | null>(null);
  const createPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const username = createUsernameRef.current?.value;
    const password = createPasswordRef.current?.value;
    const email = createEmailRef.current?.value;
    if (username && password && email)
      await createUser({ username, password, email });
  };

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

      <button type="submit" className="primary">
        Register
      </button>
    </form>
  );
};
