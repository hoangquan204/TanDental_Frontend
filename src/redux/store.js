import { configureStore } from "@reduxjs/toolkit";
import nhaKhoaReducer from "./slices/nhaKhoaSlice";
import authReducer from "./slices/authSlice";
import nguoiLienHeReducer from "./slices/nguoiLienHeSlice";
import benhNhanReducer from "./slices/benhNhanSlice";
import staffReducer from "./slices/staffSlice";
import sanPhamReducer from "./slices/sanPhamSlice"; // Thêm dòng này
import congDoanReducer from "./slices/congDoanSlice"; // Thêm dòng này
import donHangReducer from "./slices/donHangSlice"; // Thêm dòng này
import chamSocKhachHangReducer from "./slices/chamSocKhachHangSlice"
import bangGiaReducer from "./slices/bangGiaSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    nhaKhoa: nhaKhoaReducer,
    nguoiLienHe: nguoiLienHeReducer,
    benhNhan: benhNhanReducer,
    staff: staffReducer,
    sanPham: sanPhamReducer, // Đăng ký ngăn tủ Sản Phẩm
    congDoan: congDoanReducer, // Đăng ký ngăn tủ Công đoạn
    donHang: donHangReducer,
    chamSocKhachHang: chamSocKhachHangReducer,
    bangGia: bangGiaReducer,
  },
});