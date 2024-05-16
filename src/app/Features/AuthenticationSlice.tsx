import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUserData } from "@/types";
import Cookies from "js-cookie";

interface AuthenticationState {
  session: string | null;
  userData: IUserData | null;
  showLoginPopUp: boolean;
}
const initialState: AuthenticationState = {
  session: Cookies.get("UT") || null,
  userData: JSON.parse(localStorage.getItem("UD") as object) || null,
  showLoginPopUp: false,
};
export const AuthorizedSlice = createSlice({
  name: "Authorized",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<string | null>) => {
      state.session = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUserData | null>) => {
      state.userData = action.payload;
    },
    setShowLoginPopUp: (state, action: PayloadAction<boolean>) => {
      state.showLoginPopUp = action.payload;
    },
  },
});

export default AuthorizedSlice.reducer;
export const { setUserData, setSession, setShowLoginPopUp } =
  AuthorizedSlice.actions;
export const session = (state: RootState) => state.Authentication.session;
export const userData = (state: RootState) => state.Authentication.userData;
export const showLoginPopUp = (state: RootState) =>
  state.Authentication.showLoginPopUp;
