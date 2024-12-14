import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { loadDocuments } from "./api";
import {
  LoginForm,
  RegisterForm,
  Documents,
  ProtectedRoute,
  Home,
} from "./components";
import "./index.css";
import { paths } from "./constants";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.login} element={<LoginForm />} />
        <Route path={paths.register} element={<RegisterForm />} />
        <Route
          path={paths.documents}
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
          loader={loadDocuments}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
