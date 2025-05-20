import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Button,
  MenuItem,
  Select,
} from '@mui/material';
import HotelCard from './HotelCard';
import { useHotels } from '../../context/HotelContext';

const MainContent = () => {
  const { hotels, fetchHotels, selectedCity, loading, error } = useHotels();
  const [city, setCity] = useState('');
  const [uniqueCities, setUniqueCities] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]); // 🆕

  // استخراج المدن
  useEffect(() => {
    const cities = [
      ...new Set(hotels.map((hotel) => hotel.location.split(',')[0].trim())),
    ];
    setUniqueCities(cities);
  }, [hotels]);

  // فلترة الفنادق عند اختيار مدينة
  const handleSearch = () => {
    const filtered = hotels.filter((hotel) =>
      hotel.location.split(',')[0].trim().toLowerCase() === city.toLowerCase()
    );
    setFilteredHotels(filtered);
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* البحث */}
      <Box sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
        <Select
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          displayEmpty
          sx={{
            mb: 2,
            backgroundColor: 'white',
            borderRadius: 1,
          }}
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

      {/* العنوان */}
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        {city ? `Hotels in ${city}` : 'All Hotels'}
      </Typography>

      {/* النتائج */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      ) : (city ? filteredHotels.length > 0 : hotels.length > 0) ? (
        <Grid container spacing={3}>
          {(city ? filteredHotels : hotels).map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
          No hotels found {city && `in ${city}`}.
        </Typography>
      )}
    </Container>
  );
};

export default MainContent;
