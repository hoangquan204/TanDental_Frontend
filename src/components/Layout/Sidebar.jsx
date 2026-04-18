import React, { useState } from "react";
import {
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Tooltip,
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

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = collapsed ? 64 : 240;

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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {/* ===== MENU CHÍNH ===== */}
        {menu.map((item, index) => (
          <Tooltip
            key={index}
            title={collapsed ? item.name : ""}
            placement="right"
          >
            <ListItemButton
              onClick={() => navigate(item.router)}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1 : 2,
              }}
              className={`transition ${
                isActive(item.router)
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                }}
                className={isActive(item.router) ? "text-blue-600" : ""}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && <ListItemText primary={item.name} />}
            </ListItemButton>
          </Tooltip>
        ))}

        {/* ===== DROPDOWN ===== */}
        <Tooltip
          title={collapsed ? "Quản lý khách hàng" : ""}
          placement="right"
        >
          <ListItemButton
            onClick={() => setOpenCustomer(!openCustomer)}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1 : 2,
            }}
            className={`transition ${
              isCustomerActive
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 2,
                justifyContent: "center",
              }}
            >
              <People />
            </ListItemIcon>

            {!collapsed && <ListItemText primary="Quản lý khách hàng" />}

            {!collapsed && (openCustomer ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </Tooltip>

        <Collapse in={openCustomer && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {customerMenu.map((item, index) => (
              <Tooltip
                key={index}
                title={collapsed ? item.name : ""}
                placement="right"
              >
                <ListItemButton
                  sx={{
                    pl: collapsed ? 1 : 4,
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                  onClick={() => navigate(item.router)}
                  className={`transition ${
                    isActive(item.router)
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: "center",
                    }}
                    className={isActive(item.router) ? "text-blue-600" : ""}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {!collapsed && <ListItemText primary={item.name} />}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Collapse>

        {/* ===== MENU KHÁC ===== */}
        {otherMenu.map((item, index) => (
          <Tooltip
            key={index}
            title={collapsed ? item.name : ""}
            placement="right"
          >
            <ListItemButton
              onClick={() => navigate(item.router)}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1 : 2,
              }}
              className={`transition ${
                isActive(item.router)
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                }}
                className={isActive(item.router) ? "text-blue-600" : ""}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && <ListItemText primary={item.name} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
