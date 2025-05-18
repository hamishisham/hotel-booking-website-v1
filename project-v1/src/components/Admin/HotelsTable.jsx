// components/HotelsTable.jsx
import React, { useState } from "react";
import {
  Box, Button, CircularProgress, Table, TableBody, TableCell, TableHead,
  TableRow, Typography, useTheme, IconButton, Avatar, FormControl,
  InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, TablePagination
} from "@mui/material";
import { Rating } from "@mui/material";
import { Visibility, Edit, Delete, Add } from "@mui/icons-material";

import { useHotels } from "../../context/HotelContext";
import HotelViewDialog from "./Hotel/ViewHotelDialog";
import HotelEditDialog from "./Hotel/EditHotelDialog";
import AddHotelDialog from "./Hotel/AddHotelDialog";

const HotelsTable = () => {
  const { hotels, loading, deleteHotel, updateHotel, addHotel } = useHotels();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [searchField, setSearchField] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [editedData, setEditedData] = useState({ gallery: [] });
  const [newHotelData, setNewHotelData] = useState({
    name: "",
    location: "",
    rating: 0,
    description: "",
    image: "",
    gallery: []
  });

  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const validate = (data) => {
    const newErrors = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.image) newErrors.image = "Image is required";
    if (data.rating === 0) newErrors.rating = "Rating is required";
    return newErrors;
  };

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditedData({ ...editedData, image: reader.result });
      } else {
        setNewHotelData({ ...newHotelData, image: reader.result });
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setViewOpen(true);
  };

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setEditedData(hotel);
    setErrors({});
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const newErrors = validate(editedData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    updateHotel(editedData);
    setEditOpen(false);
  };

  const handleAddChange = (e) => {
    setNewHotelData({ ...newHotelData, [e.target.name]: e.target.value });
  };

  const handleAddSave = () => {
    const newErrors = validate(newHotelData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addHotel(newHotelData);
    setAddOpen(false);
    setNewHotelData({
      name: "",
      location: "",
      rating: 0,
      description: "",
      image: "",
      gallery: []
    });
    setErrors({});
  };

  const handleDeleteClick = (hotel) => {
    setSelectedHotel(hotel);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedHotel) {
      deleteHotel(selectedHotel.id);
      setConfirmOpen(false);
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel[searchField]?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const paginatedHotels = filteredHotels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ bgcolor: isDarkMode ? "#1e1e1e" : "#fff", borderRadius: 2, boxShadow: 2 }}>
      {/* Title and Add button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
  <Typography variant="h5">Hotel List</Typography>
  <Button
    variant="contained"
    color="primary"
    startIcon={<Add />}
    onClick={() => {
      setErrors({});
      setAddOpen(true);
    }}
  >
    Add New Hotel
  </Button>
</Box>


      {/* Search */}
<Box display="flex" flexWrap="wrap" gap={2} mb={4} justifyContent="flex-start">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Search by</InputLabel>
          <Select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            label="Search by"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="location">Location</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search by first letter"
          variant="outlined"
          size="small"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0); // Reset to first page on search
          }}
        />
      </Box>

      {/* Table */}
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}>
            {["Image", "Name", "Location", "Rating", "Actions"].map(head => (
              <TableCell key={head} sx={{ fontWeight: "bold" }}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedHotels.map(hotel => (
            <TableRow key={hotel.id} sx={{ "&:hover": { backgroundColor: isDarkMode ? "#2a2a2a" : "#f9f9f9" } }}>
              <TableCell>
                <Avatar variant="rounded" src={hotel.image} alt={hotel.name} sx={{ width: 40, height: 40 }} />
              </TableCell>
              <TableCell>{hotel.name}</TableCell>
              <TableCell>{hotel.location}</TableCell>
              <TableCell>
                <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleView(hotel)} color="primary"><Visibility fontSize="small" /></IconButton>
                <IconButton onClick={() => handleEdit(hotel)} color="secondary"><Edit fontSize="small" /></IconButton>
                <IconButton onClick={() => handleDeleteClick(hotel)} color="error"><Delete fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredHotels.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />

      {/* Dialogs */}
      <HotelViewDialog open={viewOpen} onClose={() => setViewOpen(false)} hotel={selectedHotel} />
      <HotelEditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEditSave}
        onChange={handleEditChange}
        onImageUpload={(e) => handleImageUpload(e, true)}
        hotelData={editedData}
        errors={errors}
      />
      <AddHotelDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
        onChange={handleAddChange}
        onImageUpload={(e) => handleImageUpload(e, false)}
        data={newHotelData}
        errors={errors}
      />

      {/* Delete Confirmation */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedHotel?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelsTable;
