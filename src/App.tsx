import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          lazy: () => import("./Pages/HomePage/HomePage.tsx"),
        },

        {
          path: "not-found",
          lazy: () => import("./components/SubComponents/NotFound.tsx"),
        },
      ],
    }, //!NotFound
    {
      path: "*",
      lazy: () => import("./components/SubComponents/NotFound.tsx"),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
