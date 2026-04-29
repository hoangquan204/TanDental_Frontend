import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { Route, Routes } from "react-router-dom";
import DonHangPage from "../DonHang/DonHangPage";
import DonHangForm from '../DonHang/DonHangForm';
import Charts from "../Charts";
import NhaKhoaPage from "../NhaKhoa/NhaKhoaPage";
import NguoiLienHePage from "../NguoiLienHe/NguoiLienHePage";
import BenhNhanPage from "../BenhNhan/BenhNhanPage";
import SanPhamPage from "../SanPham/SanPhamPage";
import CongDoanPage from "../CongDoan/CongDoanPage";
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
      <Sidebar collapsed={collapsed} />
      <Box
        component="main"
        className="bg-gray-100 min-h-screen w-full"
        sx={{
          mt: "66px",
          ml: collapsed ? "16px" : "60px",
          transition: "all 0.3s",
        }}
      >
        <Routes>
          <Route path="/" element={<Charts />} />
          <Route path="/don-hang/*" element={<DonHangPage />} />
          <Route path="/donhang/create" element={<DonHangForm />} />
          <Route path="/donhang/:id/edit" element={<DonHangForm />} />
          <Route path="/nha-khoa" element={<NhaKhoaPage />} />
          <Route path="/nguoi-lien-he" element={<NguoiLienHePage />} />
          <Route path="/benh-nhan" element={<BenhNhanPage />} />
          <Route path="/san-pham" element={<SanPhamPage />} />
          <Route path="/cong-doan" element={<CongDoanPage />} />

        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
