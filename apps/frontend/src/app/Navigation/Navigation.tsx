import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
const Navigation = () => {
  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.pathname = 'login';
  };
  return (
    <AppBar position="relative" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Navigation Bar</Typography>
        <IconButton onClick={handleLogOut}>
          <Typography>Log out</Typography>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
