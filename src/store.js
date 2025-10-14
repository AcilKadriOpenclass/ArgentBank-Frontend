import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";

const persisted = localStorage.getItem("token");
const preloadedState = persisted
  ? {
      auth: { user: null, accessToken: persisted, status: "idle", error: null },
    }
  : undefined;
const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});
