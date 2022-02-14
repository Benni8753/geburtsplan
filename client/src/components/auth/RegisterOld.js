import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { onRegister } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useForm, SubmitHanlder } from 'react-hook-form';
import { Grid, Paper, TextField, Button, Typography, Link } from '@mui/material';

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block',
	},
	paperStyle: {
		padding: 20,
		height: '85vh',
		margin: '20px auto',
		minWidth: '200px',
		maxWidth: '500px',
	},
	btnStyle: {
		margin: '8px 0',
	},
});

const Register = ({ setAlert, onRegister, isAuthenticated }) => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	});

	const { firstName, lastName, email, password, password2 } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (data) => {
		onRegister({ firstName, lastName, email, password });
	};

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<Fragment>
			<Grid>
				<Paper elevation={10} className={classes.paperStyle}>
					<Grid align='center'>
						<h2>Sign Up</h2>
					</Grid>
					<form noValidate autoComplete='off' onSubmit={onSubmit}>
						<TextField
							className={classes.field}
							color='secondary'
							name='email'
							type='email'
							value={email}
							onChange={(e) => onChange(e)}
							label='Email'
							placeholder='Enter email address'
							fullWidth
							required
							helperText={'hello'}
						/>
						<Button type='submit' color='secondary' variant='outlined' className={classes.btnStyle} fullWidth>
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

Register.propTypes = {
	onRegister: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert, onRegister })(Register);
