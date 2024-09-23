import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly transparent white background
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
