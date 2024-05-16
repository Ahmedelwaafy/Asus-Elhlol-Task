import { usePostData } from "@/Hooks/useAxios";
import { setSession, setUserData } from "@/app/Features/AuthenticationSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function useHandleLogOut() {
  const dispatchRedux = useAppDispatch();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const errMsg =
    lang === "ar" ? "برجاء تسجيل الدخول أولا!" : "Please log in first!";
  function ResetAuthStates() {
    localStorage.removeItem("UD");
    Cookies.remove("UT");
    dispatchRedux(setUserData(null));
    dispatchRedux(setSession(null));
    window.location.replace(`/${lang}`);
  }
  function ResetAuthStatesWithToast() {
    ResetAuthStates();
    toast.error(errMsg);
  }
  const {
    mutate,
    isPending,
    error: logoutError,
  } = usePostData(
    false,
    () => {
      ResetAuthStates();
    },
    true,
    () => {
      ResetAuthStates();
    }
  );

  function logOut() {
    mutate({
      api: import.meta.env.VITE_LOGOUT_USER,
    });
  }

  return [logOut, isPending, logoutError, ResetAuthStatesWithToast];
}
