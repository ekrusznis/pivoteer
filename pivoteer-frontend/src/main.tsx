import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./components/Layout/Layout.tsx";
import TermsPage from "./components/custom_components/Terms/Terms.tsx";
import PrivacyPage from "./components/custom_components/Privacy/Privacy.tsx";
import HelpCenter from "./components/custom_components/Help/HelpCenter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/help-center" element={<HelpCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
