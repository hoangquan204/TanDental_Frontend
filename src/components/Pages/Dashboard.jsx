import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import Charts from "../Charts";
import NhaKhoaPage from "../NhaKhoa/NhaKhoaPage";
import NguoiLienHePage from "../NguoiLienHe/NguoiLienHePage";
import BenhNhanPage from "../BenhNhan/BenhNhanPage";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        className="bg-gray-100 min-h-screen w-full"
        sx={{ mt: "66px" }}
      >
        <Routes>
          <Route path="/" element={<Charts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/nha-khoa" element={<NhaKhoaPage />} />
          <Route path="/nguoi-lien-he" element={<NguoiLienHePage />} />
          <Route path="/benh-nhan" element={<BenhNhanPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
