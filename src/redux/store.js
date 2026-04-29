import { configureStore } from "@reduxjs/toolkit";
import nhaKhoaReducer from "./slices/nhaKhoaSlice";
import authReducer from "./slices/authSlice";
import nguoiLienHeReducer from "./slices/nguoiLienHeSlice";
import benhNhanReducer from "./slices/benhNhanSlice";
import staffReducer from "./slices/staffSlice";
import sanPhamReducer from "./slices/sanPhamSlice"; // Thêm dòng này
import congDoanReducer from "./slices/congDoanSlice"; // Thêm dòng này

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nhaKhoa: nhaKhoaReducer,
    nguoiLienHe: nguoiLienHeReducer,
    benhNhan: benhNhanReducer,
    staff: staffReducer,
    sanPham: sanPhamReducer, // Đăng ký ngăn tủ Sản Phẩm
    congDoan: congDoanReducer, 
  },
});