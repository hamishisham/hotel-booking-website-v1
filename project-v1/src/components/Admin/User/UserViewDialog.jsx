import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from '@mui/material';

const UserViewDialog = ({ open, user, onClose }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
        <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserViewDialog;
