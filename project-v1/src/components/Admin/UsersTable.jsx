import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  useTheme,
  CircularProgress,
  TablePagination,
  useMediaQuery,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useUsers } from "../../context/UserContext";
import UserViewDialog from "./User/UserViewDialog";
import UserEditDialog from "./User/UserEditDialog";
import ConfirmDeleteDialog from "./User/ConfirmDeleteDialog";

const UsersTable = () => {
  const { users, loading, deleteUser, updateUser } = useUsers();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Detect if screen is small (mobile)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchField, setSearchField] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredUsers = users.filter((user) =>
    user[searchField]?.toString().toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleView = (user, edit = false) => {
    setSelectedUser({ ...user });
    setEditMode(edit);
    setOpenViewDialog(true);
  };

  const handleDeleteConfirm = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateUser(selectedUser);
    setOpenViewDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      p={3}
      sx={{
        bgcolor: isDarkMode ? "#1e1e1e" : "#ffffff",
        borderRadius: 2,
        boxShadow: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h5" mb={2}>
        Users List
      </Typography>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Search by</InputLabel>
          <Select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            label="Search by"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="role">Role</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Wrap table with horizontal scroll box */}
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: isSmallScreen ? 650 : "auto" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}>
              {["Avatar", "Name", "Email", "Phone", "Role", "Actions"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: isSmallScreen ? "nowrap" : "normal",
                      maxWidth: isSmallScreen ? 150 : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar sx={{ bgcolor: isDarkMode ? "#555" : "#1976d2" }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: isSmallScreen ? "nowrap" : "normal",
                      maxWidth: isSmallScreen ? 150 : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: isSmallScreen ? "nowrap" : "normal",
                      maxWidth: isSmallScreen ? 180 : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: isSmallScreen ? "nowrap" : "normal",
                      maxWidth: isSmallScreen ? 120 : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.phone}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: isSmallScreen ? "nowrap" : "normal",
                      maxWidth: isSmallScreen ? 100 : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.role}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(user)} color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleView(user, true)} color="secondary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteConfirm(user)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />

      {selectedUser && editMode ? (
        <UserEditDialog
          open={openViewDialog}
          onClose={() => setOpenViewDialog(false)}
          onSave={handleSave}
          user={selectedUser}
          onChange={handleChange}
        />
      ) : selectedUser ? (
        <UserViewDialog
          open={openViewDialog}
          onClose={() => setOpenViewDialog(false)}
          user={selectedUser}
          editMode={false}
        />
      ) : null}

      {selectedUser && (
        <ConfirmDeleteDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={() => {
            deleteUser(selectedUser.id);
            setOpenDeleteDialog(false);
          }}
        />
      )}
    </Box>
  );
};

export default UsersTable;
