import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import UseAuth from "./Hooks/UseAuth.tsx";
import "./SASS/styles.scss";
import { setLang } from "./app/Features/MiscellaneousSlice.tsx";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks.ts";
import { AuthLayout, Layout } from "./components/LayoutComponents";
import ProtectedRoutes from "./components/ProtectionComponents/ProtectedRoutes.tsx";
function App() {
  const { i18n } = useTranslation("");
  const dispatchRedux = useAppDispatch();
  const [Session] = UseAuth();
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
  //!we use startsWith instead of ==== whereas some languages codes consist of 2 words as en-us but the language in the url always consists of one word
  useEffect(() => {
    dispatchRedux(setLang(lng));

    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = lng;
  }, [dispatchRedux, i18n, lng]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate to={`/${i18n.language?.startsWith("ar") ? "ar" : "en"}`} />
      ),
    },
    {
      path: `/${i18n.language?.startsWith("ar") ? "ar" : "en"}`,
      children: [
        //!-------- Pages Layout--------
        {
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
        },
      ],
    }, //!NotFound
    {
      path: "*",
      lazy: () => import("./components/SubComponents/NotFound.tsx"),
    },
  ]);

  return <RouterProvider router={router} />;
  /*   return <RouterProvider router={router} fallbackElement={< Loader />} />;
   */
}

export default App;
