import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Logo from '/logomini.PNG';
import AdminDropdownMenu from '../../components/Admin/AdminDropdownMenu';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: 'Home', path: '/booknest' },
    { label: 'Cities', path: '/cities' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        color: 'primary.main',
        boxShadow: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            BookNest
          </Typography>
        </Box>

        {/* Navigation and Account */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isSmallScreen ? (
            <>
              <IconButton onClick={toggleDrawer(true)} sx={{ color: 'primary.main' }}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
                  <List>
                    {navLinks.map((link) => (
                      <ListItem button key={link.label} component={Link} to={link.path}>
                        <ListItemText primary={link.label} />
                      </ListItem>
                    ))}
                    {!user && (
                      <ListItem button component={Link} to="/">
                        <ListItemText primary="Sign In" />
                      </ListItem>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  sx={{ color: 'primary.main' }}
                  component={Link}
                  to={link.path}
                >
                  {link.label}
                </Button>
              ))}
            </>
          )}

          {/* Account Menu always visible */}
          {user ? (
            <Box sx={{ ml: 2 }}>
              <AdminDropdownMenu />
            </Box>
          ) : (
            !isSmallScreen && (
              <Button sx={{ color: 'primary.main', ml: 2 }} component={Link} to="/">
                Sign In
              </Button>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
