import { configureStore } from "@reduxjs/toolkit";
import nhaKhoaReducer from "./slices/nhaKhoaSlice";
import authReducer from "./slices/authSlice";
import nguoiLienHeReducer from "./slices/nguoiLienHeSlice";
import benhNhanReducer from "./slices/benhNhanSlice"



export const store = configureStore({
  reducer: {
    auth: authReducer,
    nhaKhoa: nhaKhoaReducer,
    nguoiLienHe: nguoiLienHeReducer,
    benhNhan: benhNhanReducer,
  },
});