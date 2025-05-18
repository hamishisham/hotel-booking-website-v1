import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from "@mui/material";

const HotelViewDialog = ({ open, onClose, hotel }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>{hotel?.name}</DialogTitle>
    <DialogContent>
      <img src={hotel?.image} alt={hotel?.name} style={{ width: "100%", borderRadius: 8 }} />
      <Typography mt={2}>Location: {hotel?.location}</Typography>
      <Typography>Rating: {hotel?.rating}</Typography>
      <Typography>Description: {hotel?.description}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Close</Button>
    </DialogActions>
  </Dialog>
);

export default HotelViewDialog;
