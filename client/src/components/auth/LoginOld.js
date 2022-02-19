import React, { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Navigate } from 'react-router-dom';

import { Grid, Paper, TextField, Button, Typography, Link } from '@mui/material';

const paperStyle = {
  padding: 20,
  height: '85vh',
  margin: '20px auto',
  minWidth: '200px',
  maxWidth: '500px',
};
const btnstyle = { margin: '8px 0' };

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if login
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h2>Sign In</h2>
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
              label='Password'
              placeholder='Enter password'
              type='password'
              fullWidth
              required
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <FormControlLabel control={<Checkbox name='checkedB' color='secondary' />} label='Remember me' />
            <Button type='submit' color='secondary' variant='outlined' style={btnstyle} fullWidth>
              Sign In
            </Button>
          </form>
          <Typography>
            <Link color='secondary' href='#'>
              Forgot password ?
            </Link>
          </Typography>

          <Typography>
            {' '}
            Don't have an account ?
            <Link color='secondary' href='/register'>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
