import React from "react";
import { Box } from "@mui/material";
import Sidebar, { drawerWidth } from "../Layout/Sidebar";
import CardItem from "../CardItem";
import Header from "../Layout/Header";
import { Route, Routes } from "react-router-dom";
import Statistics from "./Statistics";
import Orders from "./Orders";
import Charts from "../Charts";

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
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
