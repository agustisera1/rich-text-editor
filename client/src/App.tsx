import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks";
import { useNavigate } from "react-router";
import { paths } from "./constants";
import { PageLayout } from "./components/PageLayout";

function App() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!isLogged) navigate("/");
  }, [isLogged, navigate]);

  return (
    <PageLayout>
      <h1>Nolte Docs</h1>
      <button onClick={() => navigate(paths.login)}>Log in</button>
      <button onClick={() => navigate(paths.register)}>Register</button>
    </PageLayout>
  );
}

export default App;
