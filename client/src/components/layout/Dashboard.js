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
    height: '80vh',
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

const Dashboard = ({ alerts, login, isAuthenticated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);

  const classes = useStyles();
  const formData = { email: '', password: '' };
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <section>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Grid>
            <Paper elevation={10} className={classes.paperStyle}>
              Dashboard
            </Paper>
          </Grid>
        </Fragment>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Dashboard);
