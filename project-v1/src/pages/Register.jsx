import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import logo from '/logomini.PNG';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email address';
    if (!form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }
    if (!form.age) newErrors.age = 'Age is required';
    if (!form.phone.match(/^\d{10,15}$/)) newErrors.phone = 'Phone number is invalid';
    if (!form.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });

    // Remove error style on user input
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const newUser = {
      ...form,
      isLoggedIn: false,
      role: 'user',
    };

    try {
      await axios.post("https://hotel-json-server-production.up.railway.app/users", newUser);
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 150, margin: '0 auto', display: 'block' }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#0D47A1',
              letterSpacing: 2,
              mb: 1,
              fontFamily: 'Georgia, serif',
            }}
          >
            BookNest
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            color: '#0D47A1',
            letterSpacing: 2,
            mt: 0.25,
            fontFamily: 'Georgia, serif',
          }}
        >
          Register
        </Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange('name')}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.age}
            >
              <InputLabel>Age</InputLabel>
              <Select
                label="Age"
                value={form.age}
                onChange={handleChange('age')}
              >
                {[...Array(83).keys()].map(i => (
                  <MenuItem key={i} value={i + 18}>
                    {i + 18}
                  </MenuItem>
                ))}
              </Select>
              {errors.age && <FormHelperText>{errors.age}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={form.phone}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
        </Grid>

        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={form.address}
          onChange={handleChange('address')}
          error={!!errors.address}
          helperText={errors.address}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Already have an account? Login
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
