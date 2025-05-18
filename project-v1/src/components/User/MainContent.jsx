import React, { useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress, Container } from '@mui/material';
import HotelCard from './HotelCard';
import { useHotels } from '../../context/HotelContext';

const MainContent = () => {
  const { hotels, fetchHotels, selectedCity, loading, error } = useHotels();

  useEffect(() => {
    fetchHotels(selectedCity);
  }, [selectedCity, fetchHotels]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        {selectedCity ? `Hotels in ${selectedCity}` : 'All Hotels'}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      ) : hotels.length > 0 ? (
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
          No hotels found {selectedCity && `in ${selectedCity}`}.
        </Typography>
      )}
    </Container>
  );
};

export default MainContent;
