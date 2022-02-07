import React, { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';

const paperStyle = {
  padding: 20,
  height: '85vh',
  margin: '20px auto',
  minWidth: '200px',
  maxWidth: '500px',
};
const btnstyle = { margin: '8px 0' };

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords do not match');
    } else {
      console.log('success');
    }
  };

  return (
    <Fragment>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h2>Sign Up</h2>
          </Grid>
          <form onSubmit={onSubmit}>
            <TextField
              color='secondary'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              label='Email'
              placeholder='Enter email address'
              fullWidth
              required
            />
            <TextField
              color='secondary'
              label='First Name'
              placeholder='Enter your first name'
              fullWidth
              required
              name='firstName'
              value={firstName}
              onChange={(e) => onChange(e)}
            />
            <TextField
              color='secondary'
              label='Last Name'
              placeholder='Enter your last name'
              fullWidth
              required
              name='lastName'
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <TextField
              color='secondary'
              label='Password'
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <TextField
              color='secondary'
              label='Confirm Password'
              placeholder='Confirm your password'
              type='password'
              fullWidth
              required
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
            <FormControlLabel
              control={<Checkbox name='checkedB' color='secondary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              color='secondary'
              variant='outlined'
              style={btnstyle}
              fullWidth
            >
              Sign up
            </Button>
          </form>
          <Typography>
            {' '}
            Do you have an account ?
            <Link color='secondary' href='/login'>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default Register;
