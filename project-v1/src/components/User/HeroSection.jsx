import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  Container,
} from '@mui/material';
import { useHotels } from '../../context/HotelContext';

const HeroSection = () => {
  const [city, setCity] = useState('');
  const { hotels, fetchHotels } = useHotels();
  const [uniqueCities, setUniqueCities] = useState([]);

  useEffect(() => {
const cities = [...new Set(hotels.map((hotel) => hotel.location.split(',')[0].trim()))];
    setUniqueCities(cities);
  }, [hotels]);

  const handleSearch = () => {
    fetchHotels(city); // اعمل fetch حسب المدينة المختارة
    console.log('Searching for hotels in', city);
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('https://example.com/hero-image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        m: 0,
        p: 0,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 600, px: 2 }}>
        <Typography variant="h3" sx={{ mb: 3, textAlign: 'center' }}>
          Find Your Perfect Stay at BookNest
        </Typography>

        <Select
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          displayEmpty
          sx={{ mb: 2, backgroundColor: 'white' }}
        >
          <MenuItem value="">Select a City</MenuItem>
          {uniqueCities.map((cityOption) => (
            <MenuItem key={cityOption} value={cityOption}>
              {cityOption}
            </MenuItem>
          ))}
        </Select>
<Button
  variant="contained"
  onClick={handleSearch}
  sx={{
    textTransform: 'none',
    width: '100%',
    py: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#115293',
    },
  }}
  disabled={!city}
>
  🔍 Search Hotels
</Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
