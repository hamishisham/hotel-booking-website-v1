import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from "@mui/material";
import Rating from '@mui/material/Rating';

const HotelEditDialog = ({
  open, onClose, onSave, onChange, onImageUpload,
  hotelData, errors, setErrors
}) => {
  const [localData, setLocalData] = useState({
    name: "",
    location: "",
    rating: 0,
    description: "",
    pricePerNight: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (hotelData) {
      setLocalData({
        name: hotelData.name || "",
        location: hotelData.location || "",
        rating: hotelData.rating || 0,
        description: hotelData.description || "",
        pricePerNight: hotelData.pricePerNight != null ? hotelData.pricePerNight : "",
        image: null,
      });
      setPreviewImage(hotelData.imageUrl || null);
      setLocalErrors({});
    }
  }, [hotelData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      if (onImageUpload) {
        onImageUpload(e);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // تحويل قيمة السعر إلى رقم أو تركها فارغة
    const val = name === "pricePerNight" ? (value === "" ? "" : Number(value)) : value;
    setLocalData(prev => ({ ...prev, [name]: val }));
    if (onChange) onChange(e);
  };

  const handleRatingChange = (e, newValue) => {
    setLocalData(prev => ({ ...prev, rating: newValue }));
    if (onChange) {
      onChange({ target: { name: "rating", value: newValue } });
    }
  };

  const handleSave = () => {
    let validationErrors = {};
    if (!localData.name.trim()) validationErrors.name = "Name is required";
    if (!localData.location.trim()) validationErrors.location = "Location is required";
    if (!localData.rating || localData.rating <= 0) validationErrors.rating = "Rating must be at least 1 star";
    if (!localData.pricePerNight || isNaN(localData.pricePerNight) || Number(localData.pricePerNight) <= 0) {
      validationErrors.pricePerNight = "Price per night must be a positive number";
    }
    if (Object.keys(validationErrors).length > 0) {
      setLocalErrors(validationErrors);
      if (setErrors) setErrors(validationErrors);
      return;
    }
    if (onSave) onSave(localData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{hotelData?.id ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={localData.name}
          onChange={handleChange}
          error={!!localErrors.name}
          helperText={localErrors.name}
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="normal"
          value={localData.location}
          onChange={handleChange}
          error={!!localErrors.location}
          helperText={localErrors.location}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Box sx={{ mr: 2 }}>Rating:</Box>
          <Rating
            name="rating"
            value={localData.rating}
            onChange={handleRatingChange}
          />
          {localErrors.rating && (
            <Box sx={{ color: "error.main", ml: 2, fontSize: 12 }}>
              {localErrors.rating}
            </Box>
          )}
        </Box>
        <TextField
          label="Price Per Night"
          name="pricePerNight"
          type="number"
          fullWidth
          margin="normal"
          value={localData.pricePerNight}
          onChange={handleChange}
          error={!!localErrors.pricePerNight}
          helperText={localErrors.pricePerNight}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={localData.description}
          onChange={handleChange}
        />
       <Button variant="contained" component="label" sx={{ mt: 2 }}>
  Upload Image
  <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
</Button>

{previewImage && (
  <Box
    component="img"
    src={previewImage}
    alt="Preview"
    sx={{
      mt: 2,
      maxHeight: 200,
      maxWidth: "100%",
      objectFit: "cover",
      borderRadius: 1,
      boxShadow: 2,
      border: "1px solid #ccc"
    }}
  />
)}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          {hotelData?.id ? "Save Changes" : "Add Hotel"}
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HotelEditDialog;
