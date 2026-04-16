import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

// 📊 Fake data
const receiveData = [
  { date: "07/04", new: 120, repair: 40, remake: 20 },
  { date: "08/04", new: 90, repair: 30, remake: 10 },
  { date: "09/04", new: 150, repair: 50, remake: 25 },
  { date: "10/04", new: 130, repair: 45, remake: 15 },
];

const orderData = [
  { date: "07/04", orders: 30, customer: 20 },
  { date: "08/04", orders: 20, customer: 15 },
  { date: "09/04", orders: 35, customer: 18 },
  { date: "10/04", orders: 40, customer: 25 },
];

const revenueData = [
  { date: "07/04", revenue: 20 },
  { date: "08/04", revenue: 25 },
  { date: "09/04", revenue: 15 },
  { date: "10/04", revenue: 40 },
];

// 📦 Card wrapper
const ChartCard = ({ title, children }) => (
  <Box className="bg-white p-4 rounded-2xl shadow-md">
    <Typography variant="h6" className="mb-2">
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height={250}>
      {children}
    </ResponsiveContainer>
  </Box>
);

const Charts = () => {
  return (
    <Box className="grid grid-cols-2 gap-4 mt-4">
      {/* 📊 Hàng nhận theo loại */}
      <ChartCard title="Hàng nhận theo loại">
        <BarChart data={receiveData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="new" fill="#4caf50" name="Mới" />
          <Bar dataKey="repair" fill="#ffc107" name="Sửa" />
          <Bar dataKey="remake" fill="#f44336" name="Làm lại" />
        </BarChart>
      </ChartCard>

      {/* 📊 Tình hình nhận hàng */}
      <ChartCard title="Tình hình nhận hàng">
        <BarChart data={orderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#4caf50" name="Đơn mới" />
          <Bar dataKey="customer" fill="#2196f3" name="Khách gửi" />
        </BarChart>
      </ChartCard>

      {/* 📊 Doanh số */}
      <ChartCard title="Doanh số theo thời gian">
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#2196f3" />
        </LineChart>
      </ChartCard>

      {/* 📊 Tăng trưởng */}
      <ChartCard title="Tăng trưởng sản xuất">
        <BarChart data={orderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#4caf50" name="Hôm nay" />
          <Bar dataKey="customer" fill="#9e9e9e" name="Tuần trước" />
        </BarChart>
      </ChartCard>
    </Box>
  );
};

export default Charts;
