import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import '../src/index.css';
import Dashboard from './components/layout/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/RegisterOld';
import RegisterTwo from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/register' element={<RegisterTwo />} />
            <Route path='/' element={<Landing />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<PrivateRoute component={Dashboard} />} />
            <Route />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
