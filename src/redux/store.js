import { configureStore } from "@reduxjs/toolkit";
import nhaKhoaReducer from "./slices/nhaKhoaSlice";
import authReducer from "./slices/authSlice";
import nguoiLienHeReducer from "./slices/nguoiLienHeSlice";
import benhNhanReducer from "./slices/benhNhanSlice"
import sanPhamReducer from "./slices/sanPhamSlice"; // Thêm dòng này
import quyTrinhReducer from "./slices/quyTrinhSlice"; // Thêm dòng này


export const store = configureStore({
  reducer: {
    auth: authReducer,
    nhaKhoa: nhaKhoaReducer,
    nguoiLienHe: nguoiLienHeReducer,
    benhNhan: benhNhanReducer,
    sanPham: sanPhamReducer, // Đăng ký ngăn tủ Sản Phẩm
    quyTrinh: quyTrinhReducer, // Đăng ký ngăn tủ Quy Trình
  },
});