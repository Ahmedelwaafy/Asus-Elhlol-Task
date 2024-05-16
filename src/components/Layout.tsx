import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorBoundaryFallback } from "./SubComponents/index.ts";
function Layout() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main className="w-full bg-background  min-h-screen flex-center pattern">
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
}

export default Layout;
