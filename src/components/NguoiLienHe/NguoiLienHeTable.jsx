import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchNguoiLienHe } from "../../redux/slices/nguoiLienHeSlice";

export default function NguoiLienHeTable() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.nguoiLienHe);

  useEffect(() => {
    dispatch(fetchNguoiLienHe());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} className="rounded-2xl shadow-lg">
      <Table>
        {/* HEADER */}
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell>
              <b>Họ tên</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>SĐT</b>
            </TableCell>
            <TableCell>
              <b>Nha khoa</b>
            </TableCell>
            <TableCell>
              <b>Mô tả</b>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {/* 🔥 LOADING */}
          {loading && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {/* ❌ ERROR */}
          {error && (
            <TableRow>
              <TableCell colSpan={5} align="center" className="text-red-500">
                {error}
              </TableCell>
            </TableRow>
          )}

          {/* 📭 EMPTY */}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}

          {/* ✅ DATA */}
          {!loading &&
            data.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>{item.hoVaTen}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.soDienThoai}</TableCell>
                <TableCell>
                  <div className="font-semibold text-gray-800">
                    {item.nhaKhoa.hoVaTen}
                  </div>
                </TableCell>
                <TableCell>{item.moTa}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
