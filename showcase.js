import React, { useState, useEffect } from '@blocklet/pages-kit/builtin/react';
import { Box, IconButton, Typography } from '@blocklet/pages-kit/builtin/mui/material';

const ImageSlider = ({
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  imageHeight = '300px', // Height for the image itself
  padding = '20px', // Padding as the white bar above and below the image
  paddingColor = '#ffffff', // Background color for padding
  backgroundColor = '#f0f0f0', // Background color of the slider
  transitionType = 'rotate', // Transition type for the image slider
  autoTransition = false, // Boolean to enable auto-transition
  autoTransitionDelay = 3000, // Delay for auto-transition in milliseconds
  showSideSection = false, // Boolean to toggle the side section
  reverseLayout = false, // Boolean to reverse the layout of the slider and side section
  centerText = false, // Boolean to center the side section text
  sectionColor = '#ffffff', // Background color of the side section
  textColor = '#000000', // Text color for the side section
  fontFamily = 'Roboto, sans-serif', // Default font family
  useCover = true, // Toggle between 'cover' and 'contain'
  title = 'Default Title', // Title for the side section
  subtitle = 'Effortlessly browse through a series of stunning visuals with smooth transitions and customizable layouts.', // Subtitle for the side section
}) => {
  const images = [
    image1?.url,
    image2?.url,
    image3?.url,
    image4?.url,
    image5?.url,
    image6?.url,
    image7?.url,
    image8?.url,
    image9?.url,
    image10?.url,
  ].filter(Boolean);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-transition functionality
  useEffect(() => {
    let autoTransitionInterval;

    if (autoTransition) {
      autoTransitionInterval = setInterval(() => {
        handleNext();
      }, autoTransitionDelay);
    }

    return () => {
      if (autoTransitionInterval) {
        clearInterval(autoTransitionInterval);
      }
    };
  }, [autoTransition, autoTransitionDelay, currentImageIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500); // Transition duration
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500); // Transition duration
  };

  const getTransitionStyles = () => {
    switch (transitionType) {
      case 'blur':
        return {
          transition: 'filter 0.5s ease-in-out, opacity 0.5s ease-in-out',
          filter: isTransitioning ? 'blur(10px)' : 'blur(0)',
          opacity: isTransitioning ? 0.5 : 1,
        };
      case 'rotate':
        return {
          transition: 'transform 0.5s ease-in-out',
          transform: isTransitioning ? 'rotate(360deg)' : 'rotate(0)',
        };
      case 'cube-rotation':
        return {
          transition: 'transform 0.5s ease-in-out',
          transform: isTransitioning ? 'rotateY(90deg)' : 'rotateY(0)',
          transformOrigin: 'center',
        };
      case 'bounce':
        return {
          transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          transform: isTransitioning ? 'translateY(-10%)' : 'translateY(0)',
        };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        display: 'flex', // Flex container to align the slider and side section
        flexDirection: reverseLayout ? 'row-reverse' : 'row', // Reverse layout based on the prop
        width: '100%',
        maxWidth: '900px',
        margin: 'auto',
        backgroundColor: backgroundColor,
        boxSizing: 'border-box',
        '@media (max-width: 600px)': {
          flexDirection: 'column', // Stack slider and side section on top of each other for smaller screens
        },
      }}
    >
      {/* Side Section */}
      {showSideSection && (
        <Box
          sx={{
            width: reverseLayout ? '30%' : '30%', // Default width for larger screens
            padding: '20px',
            backgroundColor: sectionColor, // Dynamic background color
            display: 'flex',
            flexDirection: 'column',
            justifyContent: centerText ? 'center' : 'flex-start',
            textAlign: centerText ? 'center' : 'left',
            alignItems: centerText ? 'center' : 'flex-start',
            '@media (max-width: 600px)': {
              width: '100%', // Full width on smaller screens
              paddingBottom: '10px', // Add spacing when side section is on top
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '10px',
              color: textColor, // Dynamic text color
              fontFamily: fontFamily, // Apply dynamic font family
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: textColor, // Dynamic text color
              fontFamily: fontFamily, // Apply dynamic font family
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      )}

      {/* Image Slider */}
      <Box
        sx={{
          position: 'relative',
          width: showSideSection ? '70%' : '100%', // Adjust width if side section is visible
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: padding,
          paddingBottom: padding,
          backgroundColor: paddingColor, // Dynamic padding color
          '@media (max-width: 600px)': {
            width: '100%', // Full width when stacked
          },
        }}
      >
        {images.length > 0 && (
          <>
            <Box
              component="img"
              src={images[currentImageIndex]}
              sx={{
                width: '100%',
                height: imageHeight, // Set the height dynamically
                objectFit: useCover ? 'cover' : 'contain', // Toggle between cover and contain
                ...getTransitionStyles(),
              }}
              alt={`slider-${currentImageIndex}`}
            />
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                zIndex: 1,
              }}
            >
              {"<"} {/* Left arrow */}
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                zIndex: 1,
              }}
            >
              {">"} {/* Right arrow */}
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ImageSlider;
