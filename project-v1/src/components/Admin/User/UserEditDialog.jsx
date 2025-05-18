import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const UserEditDialog = ({ open, user, onClose, onSave, onChange }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={user.phone}
            onChange={onChange}
            fullWidth
          />

          {/* Role Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={user.role}
              onChange={onChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} variant="contained" color="primary">Save</Button>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEditDialog;
