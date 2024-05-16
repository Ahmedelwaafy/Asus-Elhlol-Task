import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { LoginPopUp } from "../MainComponents/index.ts";
import { ErrorBoundaryFallback } from "../SubComponents/index.ts";
import Footer from "./Footer/Footer.tsx";
import Navbar from "./Navbar/Navbar.tsx";
function Layout() {
  const { t } = useTranslation("Layout");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <>
      <LoginPopUp t={t} />
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main className="w-full   min-h-[calc(100vh-171px)]">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
