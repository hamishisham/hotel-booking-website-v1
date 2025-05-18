// components/common/ConfirmDialog.jsx
import React from "react";
import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "Confirm Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content || "Are you sure you want to delete this item?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
