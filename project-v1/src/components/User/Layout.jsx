import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <Box sx={{ minHeight: 'calc(100vh - 64px - 64px)', p: 3, backgroundColor: '#f5f5f5' }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
 
export default Layout;