import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const FormSkeleton = () => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Grid container spacing={2}>
        {/* Row 1: Text Fields */}
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" animation="wave" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" animation="wave" />
        </Grid>

        {/* Row 2: More Text Fields */}
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" animation="wave" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" animation="wave" />
        </Grid>

        {/* Row 3: Textarea or Other Components */}
        <Grid item xs={12}>
          <Skeleton variant="rectangular" animation="wave" height={100} />
        </Grid>

        {/* Row 4: Buttons */}
        <Grid item xs={12}>
          <Skeleton variant="rectangular" animation="wave" height={40} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormSkeleton;
