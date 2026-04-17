import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

export default function NhaKhoaTable({ data }) {
  return (
    <div className="p-4">
      <TableContainer component={Paper} className="rounded-2xl shadow-lg">
        <Table>
          {/* HEADER */}
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>
                <b>Tên</b>
              </TableCell>
              <TableCell>
                <b>Liên hệ</b>
              </TableCell>
              <TableCell>
                <b>Địa chỉ</b>
              </TableCell>
              <TableCell>
                <b>Website</b>
              </TableCell>
              <TableCell>
                <b>Mô tả</b>
              </TableCell>
              <TableCell>
                <b>Ngày tạo</b>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item._id}
                hover
                className="transition duration-200"
              >
                {/* TÊN */}
                <TableCell>
                  <div className="font-semibold text-gray-800">
                    {item.hoVaTen}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {item._id.slice(-6)}
                  </div>
                </TableCell>

                {/* LIÊN HỆ */}
                <TableCell>
                  <div>{item.soDienThoai}</div>
                  <div className="text-xs text-blue-500">{item.email}</div>
                </TableCell>

                {/* ĐỊA CHỈ */}
                <TableCell>
                  <div className="text-sm">{item.diaChiCuThe}</div>
                  <div className="text-xs text-gray-500">
                    {item.tinh}, {item.quocGia}
                  </div>
                </TableCell>

                {/* WEBSITE */}
                <TableCell>
                  <a
                    href={`https://${item.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.website}
                  </a>
                </TableCell>

                {/* MÔ TẢ */}
                <TableCell>
                  <div className="max-w-[200px] truncate">{item.moTa}</div>
                </TableCell>

                {/* NGÀY */}
                <TableCell>
                  <Chip
                    label={new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    color="success"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
