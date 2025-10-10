import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";

const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer: rootReducer,
});
