import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, name }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete <strong>{name}</strong>?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="contained" color="error">Delete</Button>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
