import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout/Layout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import { AuthProvider } from "./context/global/AuthContext.tsx";
import AuthGuard from "./auth/AuthGuard.tsx";
import Dashboard from "./pages/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

            <Route element={<AuthGuard />}>

              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

            </Route>

          <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
