import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CardMedia, Rating } from '@mui/material';
import { useHotels } from '../../context/HotelContext';
import { useState } from 'react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotels } = useHotels();

  const hotel = hotels.find(h => h.id === Number(id));

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    dates: '',
  });

  if (!hotel) {
    return <Typography variant="h6">Hotel not found</Typography>;
  }

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = () => {
    alert(`Booking confirmed for ${bookingData.name} at ${hotel.name}`);
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        p: 4,
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      {/* يسار - تفاصيل الفندق */}
      <Box sx={{ flex: 1, backgroundColor: '#f9f9f9', p: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={hotel.image}
          alt={hotel.name}
          sx={{ borderRadius: 2, mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          {hotel.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Location: {hotel.city}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {hotel.description || 'No description available.'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={hotel.rating || 0} readOnly precision={0.5} />
          <Typography variant="body2" ml={1}>
            {hotel.rating ? `${hotel.rating} / 5` : 'No rating'}
          </Typography>
        </Box>
      </Box>

      {/* يمين - نموذج الحجز */}
      <Box sx={{ flex: 1, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Booking for {hotel.name}
        </Typography>

        <TextField
          fullWidth
          label="Your Name"
          name="name"
          value={bookingData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Your Email"
          name="email"
          value={bookingData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Booking Dates"
          name="dates"
          value={bookingData.dates}
          onChange={handleChange}
          margin="normal"
          placeholder="e.g. 2025-06-01 to 2025-06-05"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleBookingSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Confirm Booking
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          fullWidth
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default BookingPage;
