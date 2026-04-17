import React, { useState } from "react";
import {
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";

import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  ShoppingCart,
  LocalHospital,
  Contacts,
  People,
  Assignment,
  Receipt,
  BarChart,
  Warehouse,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ===== MENU ===== */
  const menu = [
    { name: "Thống kê", router: "/", icon: <Dashboard /> },
    { name: "Đơn Hàng", router: "/orders", icon: <ShoppingCart /> },
  ];

  const customerMenu = [
    { name: "Nha Khoa", router: "/nha-khoa", icon: <LocalHospital /> },
    { name: "Người liên hệ", router: "/nguoi-lien-he", icon: <Contacts /> },
    { name: "Bệnh nhân", router: "/benh-nhan", icon: <People /> },
  ];

  const otherMenu = [
    {
      name: "Kế Hoạch Giao Hàng",
      router: "/delivery-plan",
      icon: <Assignment />,
    },
    { name: "Hóa Đơn", router: "/invoice", icon: <Receipt /> },
    { name: "Báo Cáo", router: "/reports", icon: <BarChart /> },
    { name: "Kho", router: "/warehouse", icon: <Warehouse /> },
  ];

  /* ===== ACTIVE ===== */
  const isActive = (path) => location.pathname === path;

  const isCustomerActive = customerMenu.some((item) =>
    location.pathname.includes(item.router)
  );

  const [openCustomer, setOpenCustomer] = useState(isCustomerActive);

  /* ===== UI ===== */
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {/* ===== MENU CHÍNH ===== */}
        {menu.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => navigate(item.router)}
            className={`transition ${
              isActive(item.router)
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemIcon
              className={isActive(item.router) ? "text-blue-600" : ""}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}

        {/* ===== DROPDOWN ===== */}
        <ListItemButton
          onClick={() => setOpenCustomer(!openCustomer)}
          className={`transition ${
            isCustomerActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
          }`}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>

          <ListItemText primary="Quản lý khách hàng" />
          {openCustomer ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openCustomer} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {customerMenu.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{ pl: 4 }}
                onClick={() => navigate(item.router)}
                className={`transition ${
                  isActive(item.router)
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <ListItemIcon
                  className={isActive(item.router) ? "text-blue-600" : ""}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* ===== MENU KHÁC ===== */}
        {otherMenu.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => navigate(item.router)}
            className={`transition ${
              isActive(item.router)
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemIcon
              className={isActive(item.router) ? "text-blue-600" : ""}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
export { drawerWidth };
