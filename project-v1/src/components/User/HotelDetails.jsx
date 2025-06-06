import React from 'react';
import { Box, Typography, CardMedia, Rating } from '@mui/material';

const HotelDetails = ({ hotel }) => {
  if (!hotel) return null;

  return (
    <Box sx={{ p: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={hotel.image}
        alt={hotel.name}
        sx={{ borderRadius: 2 }}
      />
      <Typography variant="h5" mt={2} mb={1}>
        {hotel.name}
      </Typography>
      <Typography variant="body1" mb={1}>
        {hotel.description || 'No description available.'}
      </Typography>
      {/* إضافة خانة السعر هنا */}
      <Typography variant="body1" fontWeight="bold" mb={2}>
        Price per night: {hotel.pricePerNight ? `$${hotel.pricePerNight}` : 'N/A'}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Rating value={hotel.rating || 0} readOnly precision={0.5} />
        <Typography variant="body2" ml={1}>
          {hotel.rating ? `${hotel.rating} / 5` : 'No ratings yet'}
        </Typography>
      </Box>
    </Box>
  );
};

export default HotelDetails;
