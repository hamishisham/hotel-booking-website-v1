import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useHotels} from '../../context/HotelContext';
import Header from '../../components/User/Header'; // Import the Header component
import Footer from '../../components/User/Footer'; // Import the Footer component
import HeroSection from '../../components/User/HeroSection'; // Import HeroSection
import HotelCard from '../../components/User/HotelCard'; // Import HotelCard
import MainContent from '../../components/User/MainContent'; // Import MainContent

const HomePage = () => {
  const { user } = useAuth();
  const [city, setCity] = useState('');
  const { hotels, fetchHotels } = useHotels();

  useEffect(() => {
    if (city) {
      fetchHotels(city);
    }
  }, [city, fetchHotels]);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection city={city} setCity={setCity} />

      {/* Main Content */}
      <Container sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Welcome {user?.name || 'Guest'}!
        </Typography>

        <MainContent city={city} hotels={hotels} />
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
