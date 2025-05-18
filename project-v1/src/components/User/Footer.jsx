import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 4 }}>
      <Typography variant="body1" align="center">
        &copy; 2025 BookNest - All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
