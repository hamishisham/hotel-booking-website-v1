import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';

const slides = [
  {
    id: 1,
    title: 'Discover Luxury Hotels',
    description: 'Find the best places to stay at unbeatable prices.',
    image: '/slide1.jpg',
  },
  {
    id: 2,
    title: 'Comfort and Style',
    description: 'Experience comfort and style in every stay.',
    image: '/slide2.jpg',
  },
  {
    id: 3,
    title: 'Book Your Dream Vacation',
    description: 'Easy and secure booking for your perfect trip.',
    image: '/slide3.jpg',
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // ⏱ Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, md: 500 },
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <Fade in={index === activeIndex} key={slide.id} timeout={700} unmountOnExit>
          <Box
            sx={{
              position: index === activeIndex ? 'relative' : 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: 3,
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            <Typography variant="h3" sx={{ mb: 2, textShadow: '2px 2px 6px rgba(0,0,0,0.7)' }}>
              {slide.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: 600, mb: 4, textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
            >
              {slide.description}
            </Typography>
          </Box>
        </Fade>
      ))}

      <Button
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          minWidth: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
        }}
      >
        ‹
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          minWidth: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
        }}
      >
        ›
      </Button>
    </Box>
  );
};

export default HeroSlider;
