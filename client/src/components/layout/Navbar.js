import React, { Fragment } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
//Hooks
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //Functions
  const login = () => {
    handleCloseNavMenu();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const authLinks = (
    <Fragment>
      <Box
        component='img'
        variant='h6'
        noWrap
        sx={{
          height: 40,
          width: 45,
          display: { xs: 'flex', md: 'none' },
        }}
        alt='Logo image'
        src='./logo_ph.png'
      />
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button
          alignContent='center'
          alignItems='center'
          color='inherit'
          href='/'
          onClick={logout}
          sx={{ my: 2, display: 'block' }}
        >
          Logout
        </Button>
        <Button
          color='inherit'
          href='/dashboard'
          sx={{ my: 2, display: 'block' }}
        >
          Dashboard
        </Button>
        <Button
          color='inherit'
          href='/dashboard'
          sx={{ my: 2, display: 'block' }}
        >
          Blog
        </Button>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Box
        component='img'
        variant='h6'
        noWrap
        sx={{
          height: 40,
          width: 45,
          display: { xs: 'flex', md: 'none' },
        }}
        alt='Logo image'
        src='./logo_ph.png'
      />
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button
          color='inherit'
          href='/login'
          onClick={login}
          sx={{ my: 2, display: 'block' }}
        >
          Login
        </Button>
        <Button
          color='inherit'
          href='/register'
          onClick={login}
          sx={{ my: 2, display: 'block' }}
        >
          Register
        </Button>
      </Box>
    </Fragment>
  );

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* <Typography
            href='/'
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography> */}
          <Box
            component='img'
            sx={{
              height: 40,
              width: 45,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              display: { xs: 'none', md: 'flex' },
            }}
            alt='Logo image'
            src='./logo_ph.png'
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={login}>
                <Typography textAlign='center'>Login</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <Typography
            href='/'
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
