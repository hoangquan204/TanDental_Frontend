import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", router: "/" },
    { name: "Đơn Hàng", router: "/orders" },
    { name: "Hàng Đã Nhận", router: "/received" },
    { name: "Kế Hoạch Giao Hàng", router: "/delivery-plan" },
    { name: "Hóa Đơn", router: "/invoice" },
    { name: "Khách Hàng", router: "/customers" },
    { name: "Báo Cáo", router: "/reports" },
    { name: "Kho", router: "/warehouse" },
  ];

  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        {menu.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              navigate(item.router);
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
export { drawerWidth };
