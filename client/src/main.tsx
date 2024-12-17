import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  LoginForm,
  RegisterForm,
  Documents,
  ProtectedRoute,
  Home,
  DocumentDetail,
  NotFound,
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
          <Route path={paths.register} element={<RegisterForm />} />
          <Route
            path={paths.documents}
            element={withPageLayout(<Documents />, true)}
          >
            <Route path={paths.document} element={<DocumentDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
