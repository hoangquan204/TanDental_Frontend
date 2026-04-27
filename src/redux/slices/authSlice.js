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

/* ================= RESTORE AUTH (Khi app load) ================= */

export const restoreAuth = createAsyncThunk(
  "auth/restore",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      // Nếu không có token → không cần restore
      if (!token) {
        return null;
      }

      // Verify token bằng cách gọi API (hoặc giải mã JWT)
      // Cách đơn giản: lấy user info từ API (nếu token hợp lệ)
      const res = await api.get("/staff"); // API này yêu cầu token trong header

      // Nếu thành công → token còn hợp lệ
      return { token, staff: res.data?.[0] || null };
    } catch (err) {
      // Token hết hạn hoặc invalid → xóa token
      localStorage.removeItem("token");
      return null;
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
    token: null,
    loading: true, // Set thành true để show loading khi app start
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
      })

      /* ===== RESTORE AUTH ===== */
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true;
      })

      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.staff;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })

      .addCase(restoreAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;