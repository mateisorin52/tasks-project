import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { uiStore } from '../stores/uiStore';

const Layout = () => {
  const navigate = useNavigate();
  const { token } = uiStore;

  useEffect(() => {
    if (!localStorage.getItem('token') && !token) {
      navigate('/login');
    } else navigate('/home');
  }, [navigate, token]);

  return (
    <Grid container direction="column">
      <Navigation />
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
