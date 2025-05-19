import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f9f9f9', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="md"> {/* Increased maxWidth */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            borderRadius: 3, 
            backgroundColor: 'white', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            maxWidth: 700,    // Added maxWidth to Paper
            margin: 'auto'    // Center Paper inside Container
          }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: '700', 
              color: 'primary.main', 
              mb: 4, 
              letterSpacing: 1 
            }}
          >
            About BookNest
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            paragraph 
            sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}
          >
            Welcome to <strong>BookNest</strong> — your trusted platform for discovering and booking top hotels across Egypt.
            Whether you're planning a vacation in Sharm El Sheikh, a business trip to Cairo, or a relaxing escape in Luxor,
            BookNest connects you to the best hotel deals, handpicked for your comfort.
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            paragraph 
            sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}
          >
            Our mission is to make hotel booking simple, secure, and tailored to your preferences. With real-time
            availability, detailed hotel information, and a user-friendly interface, you can find the perfect stay with just a few clicks.
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            paragraph 
            sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}
          >
            BookNest is proudly developed in Egypt, aiming to promote local tourism and make travel planning easier for everyone.
            Thank you for choosing us to be part of your journey.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
