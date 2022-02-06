import React, { Fragment } from 'react';
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
  height: '70vh',
  width: 500,
  margin: '20px auto',
};
const btnstyle = { margin: '8px 0' };

const Login = () => (
  <Fragment>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          color='secondary'
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
        />
        <FormControlLabel
          control={<Checkbox name='checkedB' color='secondary' />}
          label='Remember me'
        />
        <Button
          type='submit'
          color='secondary'
          variant='contained'
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          <Link color='secondary' href='#'>
            Forgot password ?
          </Link>
        </Typography>
        <Typography>
          {' '}
          Do you have an account ?
          <Link color='secondary' href='#'>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  </Fragment>
);

export default Login;
