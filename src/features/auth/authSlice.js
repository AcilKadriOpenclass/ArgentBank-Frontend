import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as apiLogin } from "../../api/client";

const initialState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { token } = await apiLogin(credentials);
      return token;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.accessToken = null;
      state.error = action.payload || action.error?.message;
    });
  },
});

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.accessToken);
export default authSlice.reducer;
export const { logout } = authSlice.actions;
