import React from 'react';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { useHotels } from '../../context/HotelContext';
import { Box, Typography, Paper, Divider, Avatar } from '@mui/material';

// دالة صغيرة تعطي لون حسب حالة الحجز
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#f0ad4e'; // أصفر
    case 'confirmed':
      return '#5cb85c'; // أخضر
    case 'cancelled':
      return '#d9534f'; // أحمر
    default:
      return '#777'; // رمادي افتراضي
  }
};

const BookingHistoryPage = () => {
  const { bookings } = useBookings();
  const { user } = useAuth();
  const { hotels, loading: hotelsLoading } = useHotels();

  if (!user || !Array.isArray(bookings) || hotelsLoading) {
    return <Typography variant="h6">Loading your booking history...</Typography>;
  }

  // حجزات المستخدم
  const userBookings = bookings.filter(
    (booking) => booking.userId === user.id
  );

  if (userBookings.length === 0) {
    return <Typography variant="h6">No booking history found.</Typography>;
  }

  // دالة لجلب بيانات الفندق بناءً على hotelId
  const getHotelById = (id) => hotels.find((hotel) => hotel.id === id);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking History
      </Typography>

      {userBookings.map((booking, index) => {
        const hotel = getHotelById(booking.hotelId);
        return (
          <Paper key={index} sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* صورة الفندق */}
            {hotel?.imageUrl && (
              <Avatar
                variant="rounded"
                src={hotel.imageUrl}
                alt={hotel.name}
                sx={{ width: 80, height: 80 }}
              />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{hotel ? hotel.name : 'Unknown Hotel'}</Typography>
              <Typography>Room Number: {booking.roomNumber}</Typography>
              <Typography>
                Dates: {booking.checkIn} to {booking.checkOut}
              </Typography>
              <Typography sx={{ color: getStatusColor(booking.status), fontWeight: 'bold' }}>
                Status: {booking.status}
              </Typography>
              <Typography>
                Guests: {booking.adults} Adults, {booking.children} Children
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default BookingHistoryPage;
