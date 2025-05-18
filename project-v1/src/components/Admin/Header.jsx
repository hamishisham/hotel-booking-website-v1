import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "/logomini.PNG";
import DarkModeToggle from "./DarkModeToggle";
import AdminDropdownMenu from "./AdminDropdownMenu";
import { useTheme } from "@mui/material/styles";

const Header = ({ height = 64, onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const appBarBgColor = theme.palette.mode === "dark" ? "#333333" : "#ffffff";
  const appBarColor = theme.palette.mode === "dark" ? "#ffffff" : "#0D47A1";

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: appBarBgColor,
        color: appBarColor,
        boxShadow: 2,
        height,
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ height, display: "flex", justifyContent: "space-between" }}>
        {/* Left Section: Hamburger + Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 1, color: appBarColor }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={Logo} alt="logo" style={{ height: 32, width: 32 }} />
          {!isMobile && (
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
              BookNest
            </Typography>
          )}
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <AdminDropdownMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
