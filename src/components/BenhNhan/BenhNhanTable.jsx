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
import { fetchBenhNhan } from "../../redux/slices/benhNhanSlice";

export default function BenhNhanTable() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.benhNhan);

  useEffect(() => {
    dispatch(fetchBenhNhan());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} className="rounded-2xl shadow-lg">
      <Table>
        {/* HEADER */}
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell>
              <b>Tên</b>
            </TableCell>
            <TableCell>
              <b>Số hồ sơ</b>
            </TableCell>
            <TableCell>
              <b>Giới tính</b>
            </TableCell>
            <TableCell>
              <b>Nha khoa</b>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {/* 🔥 LOADING */}
          {loading && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {/* ❌ ERROR */}
          {error && (
            <TableRow>
              <TableCell colSpan={4} align="center" className="text-red-500">
                {error}
              </TableCell>
            </TableRow>
          )}

          {/* 📭 EMPTY */}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}

          {/* ✅ DATA */}
          {!loading &&
            data.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>{item.hoVaTen}</TableCell>
                <TableCell>{item.soHoSo}</TableCell>
                <TableCell>{item.gioiTinh}</TableCell>
                <TableCell>
                  <div className="font-semibold text-gray-800">
                    {item.nhaKhoa?.hoVaTen || "-"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
