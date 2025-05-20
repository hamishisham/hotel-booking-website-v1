import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { Visibility, Delete, Edit } from "@mui/icons-material";
import { useBookings } from "../../context/BookingContext";
import BookingViewDialog from "./Booking/BookingViewDialog";
import BookingEditDialog from "./Booking/BookingEditDialog";
import ConfirmDeleteDialog from "./Booking/ConfirmDeleteDialog";

const STATUS_COLORS = {
  confirmed: "green",
  pending: "orange",
  cancelled: "red",
};

const ROOMS = ["101", "102", "103", "201", "202"];

const BookingsTable = () => {
  const { bookings, loading, deleteBooking, updateBooking } = useBookings();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [searchField, setSearchField] = useState("hotelId");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filteredBookings = bookings.filter((b) =>
    b[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenDialog = (booking, edit = false) => {
    setSelectedBooking({ ...booking });
    setEditMode(edit);
    setOpenViewDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedBooking(null);
    setOpenViewDialog(false);
    setEditMode(false);
  };

  const handleDeleteConfirm = (booking) => {
    setSelectedBooking(booking);
    setOpenDeleteDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateBooking(selectedBooking);
    handleCloseDialog();
  };

  const handleDelete = async () => {
    await deleteBooking(selectedBooking.id);
    setOpenDeleteDialog(false);
    setSelectedBooking(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      p={3}
      sx={{
        bgcolor: isDarkMode ? "#1e1e1e" : "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        Bookings List
      </Typography>

      {/* Search Controls */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Search by</InputLabel>
          <Select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            label="Search by"
          >
            <MenuItem value="hotelId">Hotel ID</MenuItem>
            <MenuItem value="userId">User ID</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      {/* Responsive Table Container */}
      <TableContainer
        sx={{
          maxHeight: 440,
          overflowX: "auto",
          // optional: add border radius & shadow for container
          borderRadius: 1,
          boxShadow: 1,
          bgcolor: isDarkMode ? "#2a2a2a" : "#fafafa",
        }}
      >
        <Table stickyHeader size="small" aria-label="bookings table">
          <TableHead>
            <TableRow
              sx={{ bgcolor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}
            >
              {[
                "User ID",
                "Hotel ID",
                "Room",
                "Check-In",
                "Check-Out",
                "Status",
                "Rooms",
                "Adults",
                "Children",
                "Actions",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    minWidth: head === "Actions" ? 110 : 80,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedBookings.map((b) => (
              <TableRow key={b.id} hover>
                <TableCell>{b.userId}</TableCell>
                <TableCell>{b.hotelId}</TableCell>
                <TableCell>{b.roomNumber}</TableCell>
                <TableCell>{b.checkIn}</TableCell>
                <TableCell>{b.checkOut}</TableCell>
                <TableCell sx={{ color: STATUS_COLORS[b.status] || "inherit" }}>
                  {b.status}
                </TableCell>
                <TableCell>{b.numberOfRooms}</TableCell>
                <TableCell>{b.adults}</TableCell>
                <TableCell>{b.children}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpenDialog(b, true)}
                    color="secondary"
                    size="small"
                    aria-label="edit booking"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirm(b)}
                    color="error"
                    size="small"
                    aria-label="delete booking"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paginatedBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[rowsPerPage]}
                count={filteredBookings.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage=""
                sx={{
                  ".MuiTablePagination-actions": {
                    justifyContent: "flex-end",
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Dialogs */}
      {selectedBooking && editMode && (
        <BookingEditDialog
          open={openViewDialog}
          onClose={handleCloseDialog}
          booking={selectedBooking}
          onChange={handleChange}
          onSave={handleSave}
          roomOptions={ROOMS}
        />
      )}

      {selectedBooking && !editMode && (
        <BookingViewDialog
          open={openViewDialog}
          onClose={handleCloseDialog}
          booking={selectedBooking}
        />
      )}

      {selectedBooking && (
        <ConfirmDeleteDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleDelete}
        />
      )}
    </Box>
  );
};

export default BookingsTable;
