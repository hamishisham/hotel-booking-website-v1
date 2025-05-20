import React from 'react';
import { Box } from '@mui/material';
import HeroSlider from './HeroSlider'; // تأكد من المسار الصحيح

const HeroSection = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 300, md: 500 } }}>
      <HeroSlider />
    </Box>
  );
};

export default HeroSection;
