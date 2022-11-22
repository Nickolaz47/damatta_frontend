import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: Cookies.get("damattaAuthCookie") || {} },
  reducers: {
    setCredentials: (state, action) => {
      const user = action.payload;
      Cookies.set("damattaAuthCookie", user);
      state.user = user;
    },
    logout: (state) => {
      state.user = {};
      Cookies.remove("damattaAuthCookie");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
