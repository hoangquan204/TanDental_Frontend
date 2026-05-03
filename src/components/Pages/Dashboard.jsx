import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import Charts from "../Charts";
import NhaKhoaPage from "../NhaKhoa/NhaKhoaPage";
import NguoiLienHePage from "../NguoiLienHe/NguoiLienHePage";
import BenhNhanPage from "../BenhNhan/BenhNhanPage";
import StaffPage from "../Staff/StaffPage";
import NhapDuLieu from "../Settings/NhapDuLieu";
import CongTy from "../Settings/CongTy";
import VaiTro from "../Settings/VaiTro";

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
          <Route path="/orders/*" element={<Orders />} />
          <Route path="/nha-khoa" element={<NhaKhoaPage />} />
          <Route path="/nguoi-lien-he" element={<NguoiLienHePage />} />
          <Route path="/benh-nhan" element={<BenhNhanPage />} />
          <Route path="/tai-khoan" element={<StaffPage />} />
          <Route path="/nhap-du-lieu" element={<NhapDuLieu />} />
          <Route path="/cong-ty" element={<CongTy />} />
          <Route path="/vai-tro" element={<VaiTro />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
