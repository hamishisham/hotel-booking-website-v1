import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
} from "@mui/material";

const HotelEditDialog = ({
  open, onClose, onSave, onChange, onImageUpload, hotelData, errors
}) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Edit Hotel</DialogTitle>
    <DialogContent>
      <TextField
        label="Name" name="name" fullWidth margin="normal"
        value={hotelData.name || ""} onChange={onChange}
        error={!!errors.name} helperText={errors.name}
      />
      <TextField
        label="Location" name="location" fullWidth margin="normal"
        value={hotelData.location || ""} onChange={onChange}
        error={!!errors.location} helperText={errors.location}
      />
      <TextField
        label="Rating" name="rating" type="number" fullWidth margin="normal"
        value={hotelData.rating || ""} onChange={onChange}
        error={!!errors.rating} helperText={errors.rating}
      />
      <TextField
        label="Description" name="description" fullWidth margin="normal"
        value={hotelData.description || ""} onChange={onChange}
      />
      <Button component="label">
        Upload Image
        <input type="file" hidden onChange={onImageUpload} />
      </Button>
    </DialogContent>
    <DialogActions>
      <Button onClick={onSave} color="primary">Save</Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default HotelEditDialog;
