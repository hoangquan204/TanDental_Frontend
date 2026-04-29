import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api"; // Đảm bảo đường dẫn này trỏ đúng đến file config api của bạn

/* ================= GET ALL ================= */
export const fetchDonHang = createAsyncThunk(
    "donHang/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/donhang");
            // API trả về { success: true, data: [...] } nên cần gọi res.data.data để lấy mảng
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Lỗi tải dữ liệu đơn hàng"
            );
        }
    }
);

/* ================= GET BY ID ================= */
export const fetchDonHangById = createAsyncThunk(
    "donHang/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/donhang/${id}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Lỗi tải chi tiết đơn hàng"
            );
        }
    }
);

/* ================= CREATE ================= */
export const createDonHang = createAsyncThunk(
    "donHang/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/donhang", data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Tạo đơn hàng thất bại"
            );
        }
    }
);

/* ================= UPDATE ================= */
export const updateDonHang = createAsyncThunk(
    "donHang/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/donhang/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Cập nhật đơn hàng thất bại"
            );
        }
    }
);

/* ================= DELETE ================= */
export const deleteDonHang = createAsyncThunk(
    "donHang/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/donhang/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Xóa đơn hàng thất bại"
            );
        }
    }
);

/* ================= SLICE ================= */

const donHangSlice = createSlice({
    name: "donHang",

    initialState: {
        data: [], // State chuẩn là một mảng rỗng
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            /* ===== FETCH ===== */
            .addCase(fetchDonHang.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDonHang.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || []; // Gán mảng dữ liệu vào state
            })
            .addCase(fetchDonHang.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ===== CREATE ===== */
            .addCase(createDonHang.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDonHang.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload); // Thêm đơn hàng mới lên đầu danh sách
            })
            .addCase(createDonHang.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ===== UPDATE ===== */
            .addCase(updateDonHang.fulfilled, (state, action) => {
                const index = state.data.findIndex(
                    (item) => item._id === action.payload._id
                );
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })

            /* ===== DELETE ===== */
            .addCase(deleteDonHang.fulfilled, (state, action) => {
                state.data = state.data.filter(
                    (item) => item._id !== action.payload
                );
            });
    },
});

export default donHangSlice.reducer;