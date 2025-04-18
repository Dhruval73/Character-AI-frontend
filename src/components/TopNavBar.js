import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const TopNavBar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // 👈 Get logout from AuthContext

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(navigate); // 👈 This will clear user and localStorage, and navigate to /login
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#111", borderBottom: "1px solid #1f1f1f" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
          TalkToYourLegends.com
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "#eee" }}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleAvatarClick} size="small" sx={{ p: 0 }}>
            <Avatar
              sx={{ bgcolor: "#444", width: 32, height: 32 }}
              src={user?.avatar || ""}
              alt={user?.name || "U"}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 160,
                backgroundColor: "#222",
                color: "#fff",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
