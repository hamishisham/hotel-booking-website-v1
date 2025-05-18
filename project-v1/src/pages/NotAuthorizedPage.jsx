import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      component={motion.div}
      initial={{ opacity: 0, y: -30 }}
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
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#fff8f0",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h1" color="error" fontWeight="bold" gutterBottom>
          401
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Not Authorized
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#444" }}>
          You don’t have permission to access this page.
        </Typography>
        <Button variant="contained" color="error" onClick={() => navigate("/")}>
          Return Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotAuthorizedPage;
