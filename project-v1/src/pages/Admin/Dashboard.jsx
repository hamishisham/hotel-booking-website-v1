// src/pages/Dashboard.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext.jsx';

const Dashboard = () => {
    const { user } = useAuth();

  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
<Typography variant="h4">Welcome {user?.name || "Guest"}</Typography>
</Box>
  );
};

export default Dashboard;
