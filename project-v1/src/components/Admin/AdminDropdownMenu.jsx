import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuColor = theme.palette.mode === "dark" ? "#ffffff" : "#0D47A1";
  const avatarBorderColor = theme.palette.mode === "dark" ? "#ffffff" : "#0D47A1";
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
        <Avatar
          alt={user?.name}
          sx={{
            border: `2px solid ${avatarBorderColor}`,
            bgcolor: theme.palette.primary.main,
            color: "#fff",
          }}
        >
          {userInitial}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 150,
            backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#ffffff",
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          },
        }}
      >
        <MenuItem sx={{ color: menuColor }}>Profile</MenuItem>
        <MenuItem sx={{ color: menuColor }} onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AdminDropdownMenu;
