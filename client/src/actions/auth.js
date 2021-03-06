import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGOUT, LOGIN_SUCCESS } from './types';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error('catch from action/auth.js load user');
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const onRegister =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 10000)));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error', 10000)));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
