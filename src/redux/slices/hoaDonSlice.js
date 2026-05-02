import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

/* ================= ASYNC THUNKS ================= */

export const fetchDonHangChuaHoaDon = createAsyncThunk(
  "hoaDon/fetchDonHangChuaHoaDon",
  async (nhaKhoaId) => {
    const res = await api.get(`/hoa-don/don-hang-chua-xuat/${nhaKhoaId}`);
    return res.data;
  }
);

export const fetchAllHoaDonAdmin = createAsyncThunk(
  "hoaDon/fetchAllAdmin",
  async ({ page, search, trangThai } = {}) => {
    const res = await api.get(`/hoa-don/all`, {
      params: { page, search, trangThai }
    });
    return res.data;
  }
);

export const fetchHoaDonByNhaKhoa = createAsyncThunk(
  "hoaDon/fetchByNhaKhoa",
  async (nhaKhoaId) => {
    const res = await api.get(`/hoa-don/nha-khoa/${nhaKhoaId}`);
    return res.data;
  }
);

export const createHoaDon = createAsyncThunk(
  "hoaDon/create",
  async (payload) => {
    const res = await api.post(`/hoa-don`, payload);
    return res.data;
  }
);

export const updateHoaDon = createAsyncThunk(
  "hoaDon/update",
  async ({ id, data }) => {
    const res = await api.put(`/hoa-don/${id}`, data);
    return res.data;
  }
);

/* ================= SLICE ================= */

const slice = createSlice({
  name: "hoaDon",
  initialState: {
    donHangs: [], 
    danhSachHoaDon: [], 
    pagination: {}, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* 1. CÁC addCase PHẢI ĐẶT Ở ĐẦU */

      // Lấy đơn hàng chưa xuất hóa đơn
      .addCase(fetchDonHangChuaHoaDon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonHangChuaHoaDon.fulfilled, (state, action) => {
        state.loading = false;
        state.donHangs = action.payload;
      })

      // Tạo hóa đơn thành công
      .addCase(createHoaDon.fulfilled, (state, action) => {
        alert("Tạo hóa đơn thành công");
        const createdOrders = action.meta.arg.danhSachDonHang;
        const ids = createdOrders.map((item) => item.donHangId);
        
        // Xóa các đơn hàng đã chọn khỏi danh sách chờ
        state.donHangs = state.donHangs.filter((dh) => !ids.includes(dh._id));
        
        if (action.payload.success) {
          state.danhSachHoaDon.unshift(action.payload.data);
        }
      })

      // Cập nhật hóa đơn thành công
      .addCase(updateHoaDon.fulfilled, (state, action) => {
        const index = state.danhSachHoaDon.findIndex(hd => hd._id === action.payload.data._id);
        if (index !== -1) {
          state.danhSachHoaDon[index] = action.payload.data;
        }
        alert("Cập nhật thành công");
      })

      /* 2. CÁC addMatcher PHẢI ĐẶT SAU CÁC addCase */

   .addCase(fetchAllHoaDonAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllHoaDonAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.danhSachHoaDon = action.payload.data;
        state.pagination = {
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage
        };
      })
  },
});

export default slice.reducer;