import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged, navigate]);

  return (
    <>
      <h1>Nolte Docs</h1>
      <button onClick={() => navigate("/login")}>Log in</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

export default App;
