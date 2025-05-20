import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useHotels } from '../../context/HotelContext';
import HeroSection from '../../components/User/HeroSection';
import MainContent from '../../components/User/MainContent';

const HomePage = () => {
  const [city, setCity] = useState('');
  const { hotels, fetchHotels } = useHotels();

  useEffect(() => {
    if (city) {
      fetchHotels(city);
    }
  }, [city, fetchHotels]);

  return (
    <Box sx={{ width: '100%', p: 0, m: 0, backgroundColor: '#f5f5f5' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <Box sx={{ mt: 0, px: 0 }}>
        <MainContent city={city} hotels={hotels} />
      </Box>
    </Box>
  );
};

export default HomePage;
