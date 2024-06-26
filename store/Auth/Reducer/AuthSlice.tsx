import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthInterface } from "./AuthInterface";

const initialState = {
  isAuthenticated: false,
  isAuthLoading: false,
  token: null,
  user: {},
  id: "",
} as AuthInterface;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<null | string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

export const useAuthSlice = {
  ...authSlice.actions,
};

export default authSlice.reducer;
