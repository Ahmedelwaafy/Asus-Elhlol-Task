import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface MiscellaneousState {
  toggleLogOutPopUp: boolean;
  lang: string;
 
  currentUserMenuTab: string;
}
const initialState: MiscellaneousState = {
  toggleLogOutPopUp: false,
  lang: "en",
  currentUserMenuTab: "",
};

export const MiscellaneousSlice = createSlice({
  name: "Miscellaneous",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setToggleLogOutPopUp: (state, action: PayloadAction<boolean>) => {
      state.toggleLogOutPopUp = action.payload;
    },
   
   
    setCurrentUserMenuTab: (state, action: PayloadAction<string>) => {
      state.currentUserMenuTab = action.payload;
    },
  },
});

export default MiscellaneousSlice.reducer;
export const {
  setToggleLogOutPopUp,
  setLang,
  setCurrentUserMenuTab,
} = MiscellaneousSlice.actions;

export const toggleLogOutPopUp = (state: RootState) =>
  state.Miscellaneous.toggleLogOutPopUp;
export const lang = (state: RootState) => state.Miscellaneous.lang;
export const currentUserMenuTab = (state: RootState) =>
  state.Miscellaneous.currentUserMenuTab;
