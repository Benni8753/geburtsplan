import React, { Fragment, useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Paper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form, Formik } from 'formik';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { object, string, ref } from 'yup';
import { makeStyles } from '@material-ui/core';
import { onRegister } from '../../actions/auth';
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
  // alert: {
  //   paddingTop: 10,
  // },
});

const Register = ({ alerts, onRegister, isAuthenticated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 500));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);

  const classes = useStyles();
  const formData = { email: '', firstName: '', lastName: '', password: '', password2: '' };
  const [emailExist, setEmailExist] = useState(false);
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
                <h2>Sign Up</h2>
              </Grid>
              <Formik
                initialValues={formData}
                onSubmit={(values, formikHelpers) => {
                  setBtnLoading(true);
                  const { firstName, lastName, email, password } = values;
                  //   formikHelpers.resetForm();
                  if (!isAuthenticated) {
                    setEmailExist(true);
                  }
                  onRegister({ firstName, lastName, email, password });
                  console.log(alerts);
                  setTimeout(() => setBtnLoading(false), 1000);
                }}
                validationSchema={object({
                  email: string().required('Please provide a valid email address').email('Invalid email'),
                  firstName: string().required('Please enter your name').min(2, 'The entered name is too short'),
                  lastName: string().required('Please enter your name').min(2, 'The entered name is too short'),
                  password: string().required('Please enter a password').min(6, 'minimum of 6 characters'),
                  password2: string()
                    .required('Please confirm your password')
                    .min(6, 'minimum of 6 characters')
                    .oneOf([ref('password'), null], 'Passwords must match'),
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
                      error={(Boolean(errors.email) && Boolean(touched.email)) || emailExist}
                      helperText={(Boolean(touched.email) && errors.email) || ' '}
                    />
                    <Box height={14} />
                    <Field
                      name='firstName'
                      type='firstName'
                      as={TextField}
                      variant='outlined'
                      color='secondary'
                      label='Given Name'
                      fullWidth
                      error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                      helperText={(Boolean(touched.firstName) && errors.firstName) || ' '}
                    />
                    <Box height={14} />
                    <Field
                      name='lastName'
                      type='lastName'
                      as={TextField}
                      variant='outlined'
                      color='secondary'
                      label='Surname'
                      fullWidth
                      error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                      helperText={(Boolean(touched.lastName) && errors.lastName) || ' '}
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
                    <Field
                      name='password2'
                      type='password'
                      as={TextField}
                      variant='outlined'
                      color='secondary'
                      label='Confirm Password'
                      fullWidth
                      error={Boolean(errors.password2) && Boolean(touched.password2)}
                      helperText={(Boolean(touched.password2) && errors.password2) || ' '}
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
                      Sign up
                    </LoadingButton>
                    <Alert />
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Fragment>
      )}
    </section>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, { onRegister })(Register);
