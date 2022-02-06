import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import '../src/index.css';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Fragment>
  </BrowserRouter>
);

export default App;
