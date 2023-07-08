import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="relative" color="primary">
      <Toolbar>
        <Typography variant="h6">Navigation Bar</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
