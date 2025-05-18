import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { motion } from "framer-motion";
import Logo from "/logomini.PNG";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim() || !email.includes('@')) {
      newErrors.email = "Enter a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة عند الضغط على "Login"
    if (!validate()) return;

    try {
      const { data: users } = await axios.get("https://hotel-json-server-production.up.railway.app/users");
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        login(foundUser);
        navigate(foundUser.role === 'admin' ? '/dashboard' : '/booknest');
      } else {
        setErrors({ password: "Invalid email or password" });
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("An error occurred during login");
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: 150, margin: "0 auto", display: "block" }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#0D47A1",
              letterSpacing: 2,
              mt: 0.25,
              fontFamily: "Georgia, serif",
            }}
          >
            BookNest
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            color: "#0D47A1",
            letterSpacing: 2,
            mt: 0.25,
            fontFamily: "Georgia, serif",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Don’t have an account? <strong>Register</strong>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
