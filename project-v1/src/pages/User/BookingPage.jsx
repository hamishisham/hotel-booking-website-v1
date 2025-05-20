import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CardMedia, Rating, Grid } from '@mui/material';
import { useHotels } from '../../context/HotelContext';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext'; // ✅ تأكد من وجود السياق ده

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotels } = useHotels();
  const { createBooking } = useBookings();
  const { user } = useAuth(); // ✅ الحصول على اليوزر المسجل

  // انتظار تحميل الفنادق
  if (!hotels || hotels.length === 0) {
    return <Typography variant="h6">Loading hotels...</Typography>;
  }

  const hotel = hotels.find(h => h.id === Number(id));

  const [bookingData, setBookingData] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    numberOfRooms: 1,
    adults: 1,
    children: 0,
  });

  if (!hotel) {
    return <Typography variant="h6">Hotel not found</Typography>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async () => {
    const newBooking = {
      ...bookingData,
      userId: user.id, // ✅ ربط الحجز باليوزر
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelCity: hotel.city,
    };

    await createBooking(newBooking);
    navigate('/history'); // ✅ إعادة التوجيه لصفحة التاريخ
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
      {/* Left - Hotel Info */}
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

      {/* Right - Booking Form */}
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

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Check-In"
              name="checkIn"
              type="date"
              value={bookingData.checkIn}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Check-Out"
              name="checkOut"
              type="date"
              value={bookingData.checkOut}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Rooms"
              name="numberOfRooms"
              type="number"
              value={bookingData.numberOfRooms}
              onChange={handleChange}
              margin="normal"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Adults"
              name="adults"
              type="number"
              value={bookingData.adults}
              onChange={handleChange}
              margin="normal"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Children"
              name="children"
              type="number"
              value={bookingData.children}
              onChange={handleChange}
              margin="normal"
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

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
