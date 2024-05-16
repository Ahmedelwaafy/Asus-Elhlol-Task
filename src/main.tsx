import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import MainLoader from "./components/MainLoader.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <HelmetProvider>
      <Suspense fallback={<MainLoader />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
