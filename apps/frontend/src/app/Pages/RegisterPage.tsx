import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../utils/types';
import { useCreateUserMutationMutation } from '../../generated/graphql';
const Register = () => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });
  const [createUserMutation, { data, loading, error }] =
    useCreateUserMutationMutation();
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
      handleCreateUser();
    }
  };
  const handleCreateUser = async () => {
    try {
      const result = await createUserMutation({
        variables: {
          CreateUserInput: {
            ...formData,
          },
        },
      });

      window.location.pathname = 'login';
    } catch (error) {
      // Handle any errors that occurred during the mutation
      setErrors({ password: 'An error occured while processing the request!' });
    }
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
          loading={loading}
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
