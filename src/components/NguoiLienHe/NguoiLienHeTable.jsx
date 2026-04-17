import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function NguoiLienHeTable({ data }) {
  return (
    <TableContainer component={Paper} className="rounded-2xl shadow-lg">
      <Table>
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

        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id} hover>
              <TableCell>{item.hoVaTen}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.soDienThoai}</TableCell>
              <TableCell>{item.nhaKhoa?.hoVaTen}</TableCell>
              <TableCell>{item.moTa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
