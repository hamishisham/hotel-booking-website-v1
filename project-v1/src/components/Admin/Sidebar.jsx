import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Globe, Building2, Users ,CalendarCheck  } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { text: "Website", icon: <Globe size={20} />, path: "/booknest" },
    { text: "Hotels", icon: <Building2 size={20} />, path: "/dashboard/hotels" },
    { text: "Users", icon: <Users size={20} />, path: "/dashboard/users" },
    { text: "Bookings", icon: <CalendarCheck size={20} />, path: "/dashboard/bookings" }

  ];

  return (
    <Box
    sx={{
      width: 240,
      bgcolor: "#0D47A1",
      color: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      pt: 2, // adjust if needed
    }}
  >
  
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton onClick={() => navigate(item.path)} sx={{ color: "#fff" }}>
              <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
