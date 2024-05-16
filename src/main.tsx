import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import MainLoader from "./components/MainLoader.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Suspense fallback={<MainLoader />}>
          <App />
        </Suspense>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  </React.StrictMode>
);
