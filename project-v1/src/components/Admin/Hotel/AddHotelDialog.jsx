import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography
} from "@mui/material";
import Rating from '@mui/material/Rating';  // هنا مكون التقييم بالنجوم

const AddHotelDialog = ({
  open, onClose, onSave, data, onChange, onImageUpload, errors
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (data.image) {
      if (typeof data.image === "string") {
        setPreview(data.image);
      } else if (data.image instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(data.image);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [data.image]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Hotel</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={data.name}
          onChange={onChange}
          error={!!errors.name}
          helperText={errors.name}
          required
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="normal"
          value={data.location}
          onChange={onChange}
          error={!!errors.location}
          helperText={errors.location}
          required
        />

        {/* استبدال حقل الرقم بنظام النجوم */}
        <Box mt={2} mb={1}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            precision={0.5}
            value={Number(data.rating) || 0}
            onChange={(event, newValue) => {
              // ننشئ حدث تغيير يدوي
              onChange({
                target: {
                  name: 'rating',
                  value: newValue
                }
              });
            }}
          />
          {errors.rating && (
            <Typography color="error" variant="caption">{errors.rating}</Typography>
          )}
        </Box>

        <TextField
          label="Price Per Night ($)"
          name="pricePerNight"
          type="number"
          fullWidth
          margin="normal"
          value={data.pricePerNight}
          onChange={onChange}
          error={!!errors.pricePerNight}
          helperText={errors.pricePerNight}
          inputProps={{ min: 0, step: 0.01 }}
          required
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={data.description}
          onChange={onChange}
          multiline
          rows={3}
        />

        <Box mt={2}>
          <Button component="label" variant="contained" color="secondary">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onImageUpload(e);
                }
              }}
            />
          </Button>
        </Box>

        {preview && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onSave} color="primary" variant="contained">
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHotelDialog;
