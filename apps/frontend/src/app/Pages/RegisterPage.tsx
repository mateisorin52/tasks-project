import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../utils/types';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    fname?: string;
    lname?: string;
    email?: string;
    password?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { fname, lname, email, password } = formData;
    if (!fname) {
      setErrors({ fname: 'First name is required' });
    } else if (!lname) {
      setErrors({ lname: 'Last name is required' });
    } else if (!password) {
      setErrors({ password: 'Password is required' });
    } else if (!email) {
      setErrors({ email: 'Email is required' });
    } else if (!isValidEmail(email)) {
      setErrors({ email: 'Invalid email format' });
    } else setErrors({});

    if (Object.keys(errors).length > 0) {
      return;
    } else {
      await simulateRegister();
    }
  };
  const simulateRegister = () => {
    const { fname, lname, email, password } = formData;
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        if (!localStorage.getItem('users')) {
          localStorage.setItem(
            'users',
            JSON.stringify([{ id: uuidv4(), fname, lname, email, password }])
          );
        } else {
          const currentUsers: User[] = JSON.parse(
            localStorage.getItem('users')!
          );
          const updatedUsers: User[] = [
            ...currentUsers,
            { id: uuidv4(), fname, lname, email, password },
          ];
          if (currentUsers.find((item) => item.email === email)) {
            setErrors({ email: 'Email address already exists.' });
            setIsLoading(false);
            return;
          }
          localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
        setIsLoading(false);
        resolve();
      }, 2000);
    });
  };
  const isValidEmail = (email: string) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box maxWidth={400} marginTop={'25vh'} mx="auto">
      <TextField
        label="First Name"
        name="fname"
        value={formData.fname}
        onChange={handleChange}
        error={!!errors.fname}
        helperText={errors.fname}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Last Name"
        name="lname"
        value={formData.lname}
        onChange={handleChange}
        error={!!errors.lname}
        helperText={errors.lname}
        fullWidth
        margin="normal"
        required
      />
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
          loading={isLoading}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Register
        </LoadingButton>
      </Box>
      <Link to="/login">Login</Link>
    </Box>
  );
};

export default Register;
