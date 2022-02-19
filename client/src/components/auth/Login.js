import React, { Fragment, useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Paper, Typography, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form, Formik } from 'formik';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { object, string, ref } from 'yup';
import { makeStyles } from '@material-ui/core';
import { login } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

const useStyles = makeStyles({
  textfield: {
    marginTop: 0,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  paperStyle: {
    padding: 20,
    height: '100%',
    margin: '20px auto',
    minWidth: '200px',
    maxWidth: '500px',
  },
  button: {
    margin: '8px 0',
  },
  options: {
    marginTop: 20,
  },
  signup: {
    marginLeft: 10,
  },
});

const Login = ({ alerts, login, isAuthenticated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 500));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);

  const classes = useStyles();
  const formData = { email: '', password: '' };
  const [btnLoading, setBtnLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Grid>
            <Paper elevation={10} className={classes.paperStyle}>
              <Grid align='center'>
                <h2>Sign in</h2>
              </Grid>
              <Formik
                initialValues={formData}
                onSubmit={(values, formikHelpers) => {
                  setBtnLoading(true);
                  const { email, password } = values;
                  //   formikHelpers.resetForm();

                  login(email, password);
                  console.log(alerts);
                  setTimeout(() => setBtnLoading(false), 1000);
                }}
                validationSchema={object({
                  email: string().required('Please provide a valid email address').email('Invalid email'),
                  password: string().required('Please enter a password').min(6, 'minimum of 6 characters'),
                })}>
                {({ errors, isValid, touched, dirty }) => (
                  <Form>
                    <Field
                      name='email'
                      margin='normal'
                      type='email'
                      as={TextField}
                      variant='outlined'
                      color='secondary'
                      label='Email'
                      fullWidth
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={(Boolean(touched.email) && errors.email) || ' '}
                    />
                    <Box height={14} />
                    <Field
                      name='password'
                      type='password'
                      as={TextField}
                      variant='outlined'
                      color='secondary'
                      label='Password'
                      fullWidth
                      error={Boolean(errors.password) && Boolean(touched.password)}
                      helperText={(Boolean(touched.password) && errors.password) || ' '}
                    />

                    <Box height={14} />
                    <LoadingButton
                      loading={btnLoading}
                      // disabled={!dirty || !isValid}
                      fullWidth
                      type='submit'
                      variant='contained'
                      size='large'
                      color='secondary'
                      className={classes.button}>
                      Sign in
                    </LoadingButton>
                    <Alert />
                  </Form>
                )}
              </Formik>
              <Typography className={classes.options}>
                <Link color='secondary' href='#'>
                  Forgot password?
                </Link>
              </Typography>
              <Typography className={classes.options}>
                {' '}
                Don't have an account?
                <Link color='secondary' href='/register' className={classes.signup}>
                  Sign Up
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Fragment>
      )}
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, { login })(Login);
