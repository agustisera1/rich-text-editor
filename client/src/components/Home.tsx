import "../index.css";
import { useEffect } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router";
import { paths } from "../constants";

export const Home = () => {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) navigate(paths.home);
  }, [isLogged, navigate]);

  return (
    <>
      <h1>Nolte Docs</h1>
      <section className="card">
        <p>
          Welcome to Nolte Docs, your collaborative rich text editor. Create,
          edit, and share documents in real-time with your team.
        </p>
        <button className="primary" onClick={() => navigate(paths.login)}>
          Log in
        </button>
        <button onClick={() => navigate(paths.register)}>Register</button>
      </section>
    </>
  );
};
