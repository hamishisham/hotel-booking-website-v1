import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // ممكن ترسل مع الرابط مثلاً id الفندق عشان تستخدمه في صفحة الحجز
    navigate(`/book/${hotel.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={hotel.image}
        alt={hotel.name}
      />
      <CardContent>
        <Typography variant="h6">{hotel.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.city}
        </Typography>
        <Typography variant="h6">{hotel.price}</Typography>
        <Button variant="contained" fullWidth onClick={handleBookNow}>
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
