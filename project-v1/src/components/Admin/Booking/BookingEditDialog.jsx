import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const BookingEditDialog = ({ open, onClose, onSave, booking, onChange }) => {
  const statuses = ["Pending", "Confirmed", "Cancelled"];
  const availableRooms = [101, 102, 103, 201, 202, 203];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Booking</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="User ID"
          name="userId"
          value={booking.userId}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Hotel ID"
          name="hotelId"
          value={booking.hotelId}
          onChange={onChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Room Number</InputLabel>
          <Select
            name="roomNumber"
            value={booking.roomNumber}
            onChange={onChange}
            label="Room Number"
          >
            {availableRooms.map((room) => (
              <MenuItem key={room} value={room}>
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Check-In"
          name="checkIn"
          type="date"
          value={booking.checkIn}
          onChange={onChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Check-Out"
          name="checkOut"
          type="date"
          value={booking.checkOut}
          onChange={onChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={booking.status}
            onChange={onChange}
            label="Status"
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingEditDialog;
