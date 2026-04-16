import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Chip,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

const orders = [
  {
    id: "TAN26040501",
    time: "16/04/2026 11:52",
    clinic: "LINH DENTAL",
    doctor: "Linh",
    patient: "Lê Thị Chi",
    product: "1 ZIRCONIA R24",
    deadline: "17/04/2026 16:00",
  },
  {
    id: "TAN26040502",
    time: "16/04/2026 10:47",
    clinic: "ĐỨC TÀI - TÂN HIỆP",
    doctor: "Võ Đức Tài",
    patient: "Nguyễn Minh Khôi",
    product: "28 Kim Loại",
    deadline: "17/04/2026 18:00",
  },
];

const StatusBar = () => {
  return (
    <Box className="grid grid-cols-4 text-white text-sm font-semibold">
      <Box className="bg-teal-700 p-3">
        <Typography variant="h6">57</Typography>
        <Typography>Chờ sản xuất</Typography>
      </Box>
      <Box className="bg-green-700 p-3">
        <Typography variant="h6">1</Typography>
        <Typography>Đang sản xuất</Typography>
      </Box>
      <Box className="bg-red-500 p-3">
        <Typography variant="h6">-</Typography>
        <Typography>Trễ giờ hẹn giao</Typography>
      </Box>
      <Box className="bg-green-900 p-3">
        <Typography variant="h6">7</Typography>
        <Typography>Đang gửi thử</Typography>
      </Box>
    </Box>
  );
};

const Orders = () => {
  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      {/* Status */}
      <StatusBar />

      {/* Filter + Search */}
      <Box className="flex justify-between items-center mt-4">
        <Box className="flex items-center gap-2">
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <Chip label="Trạng thái: Chờ sản xuất, Đang sản xuất, Gửi thử" />
        </Box>

        <Box className="flex items-center gap-2">
          <TextField size="small" placeholder="Tìm kiếm" />
          <IconButton color="success">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Table */}
      <Paper className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số</TableCell>
              <TableCell>Nhận lúc</TableCell>
              <TableCell>Nha khoa</TableCell>
              <TableCell>Bác sĩ</TableCell>
              <TableCell>Bệnh nhân</TableCell>
              <TableCell>Răng</TableCell>
              <TableCell>Hẹn giao</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.clinic}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell>{row.patient}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Orders;
