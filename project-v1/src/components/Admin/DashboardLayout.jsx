import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Sidebar Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "#0D47A1",
            color: "#fff",
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Permanent Sidebar for Desktop */}
      <Box
        sx={{
          width: { xs: 0, md: drawerWidth },
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1200,
          bgcolor: "#0D47A1",
        }}
      >
        <Sidebar />
      </Box>

      {/* Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: { xs: 0, md: `${drawerWidth}px` },
          right: 0,
          height: "60px",
          zIndex: 1100,
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          marginTop: "60px",
          marginLeft: { xs: 0, md: `${drawerWidth}px` },
          padding: 3,
          bgcolor: theme.palette.mode === "dark" ? "#121212" : "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default DashboardLayout;
