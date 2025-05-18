import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const BookingViewDialog = ({ open, onClose, booking }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Booking Details</DialogTitle>
      <DialogContent>
        {booking ? (
          <Box>
            <Typography><strong>User ID:</strong> {booking.userId}</Typography>
            <Typography><strong>Hotel ID:</strong> {booking.hotelId}</Typography>
            <Typography><strong>Room:</strong> {booking.roomNumber}</Typography>
            <Typography><strong>Check-In:</strong> {booking.checkIn}</Typography>
            <Typography><strong>Check-Out:</strong> {booking.checkOut}</Typography>
            <Typography><strong>Status:</strong> {booking.status}</Typography>
          </Box>
        ) : (
          <Typography>No data</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingViewDialog;
