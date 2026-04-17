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

export default function BenhNhanTable({ data }) {
  return (
    <TableContainer component={Paper} className="rounded-2xl shadow-lg">
      <Table>
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

        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.hoVaTen}</TableCell>
              <TableCell>{item.soHoSo}</TableCell>
              <TableCell>{item.gioiTinh}</TableCell>
              <TableCell>{item.nhaKhoa?.hoVaTen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
