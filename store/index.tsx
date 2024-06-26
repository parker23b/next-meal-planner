import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

//import slices
import { authSlice } from "./Auth";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// utility
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// slice exports
export * from "./Auth";

// slice Actions export
export const authAction = authSlice.actions;

// default export
export default store;
