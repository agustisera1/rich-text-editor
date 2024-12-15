import "./index.css";
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
import { paths } from "./constants";
import { PageLayout } from "./components/PageLayout";
import { AuthProvider } from "./providers";

const withPageLayout = (Component: JSX.Element, protect?: boolean) => {
  if (protect)
    return (
      <ProtectedRoute>
        <PageLayout>{Component}</PageLayout>
      </ProtectedRoute>
    );

  return <PageLayout>{Component}</PageLayout>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.login} element={<LoginForm />} />
          <Route
            path={paths.register}
            element={withPageLayout(<RegisterForm />)}
          />
          <Route
            path={paths.documents}
            element={withPageLayout(<Documents />, true)}
            loader={loadDocuments}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
