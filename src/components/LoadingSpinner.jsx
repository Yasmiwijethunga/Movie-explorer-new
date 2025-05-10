import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const LoadingSpinner = ({ height = '60vh', message = 'Loading...' }) => {
  return (
    <Box
      height={height}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="primary" />
      <Typography variant="body1" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
