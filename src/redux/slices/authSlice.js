import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../../config/api";

/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/staff/login", data);

      // lưu token
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== LOGIN ===== */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.staff;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== LOGOUT ===== */
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;