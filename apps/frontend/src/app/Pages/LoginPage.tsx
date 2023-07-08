import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { User } from '../utils/types';
const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/home');
  }, []);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email) {
      setErrors({ email: 'Email is required' });
    } else if (!password) {
      setErrors({ password: 'Password is required' });
    } else {
      setErrors({});
      simulateLogin(email, password)
        .then(() => {
          setIsLoading(false);
          localStorage.setItem('token', 'access_token');
          navigate('/home');
        })
        .catch((error) => {
          setIsLoading(false);
          setErrors({ password: 'Invalid email or password.' });
          console.log('Login failed:', error);
        });
    }
  };

  const simulateLogin = (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        const users = localStorage.getItem('users');
        let targetUser: User | undefined;
        if (users) {
          const usersArray: User[] = JSON.parse(users);
          console.log(usersArray);
          targetUser = usersArray.find((item) => {
            return item.email === email && item.password === password;
          });
        }
        if (targetUser) {
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 2000);
    });
  };

  return (
    <Paper
      sx={{
        maxWidth: '400px',
        marginTop: '25vh',
        marginX: 'auto',
        padding: '10px',
      }}
      elevation={5}
    >
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        margin="normal"
        required
      />
      <Box textAlign="center" mt={2}>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Login
        </LoadingButton>
      </Box>
      <Link to="/register">Register</Link>
    </Paper>
  );
};

export default LoginPage;
