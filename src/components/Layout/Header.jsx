import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, background: "#1DA1F2" }}>
      <Toolbar className="flex justify-between">
        <Box className="flex items-center gap-3">
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">CÔNG TY TNHH TÂN DENTAL</Typography>
        </Box>

        <Box className="flex items-center bg-white rounded-full px-3 w-1/3">
          <SearchIcon />
          <InputBase placeholder="Tìm kiếm..." className="ml-2 w-full" />
        </Box>

        <Box className="flex items-center gap-3">
          <Button variant="contained" startIcon={<SearchIcon />}>
            Tìm đơn hàng
          </Button>
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar>C</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
