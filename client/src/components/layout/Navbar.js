import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import {
  Typography,
  Link,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const guestLinkProps = ['Login', 'Register', 'Pricing', 'About'];

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
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button color='inherit' href='/dashboard' sx={{ my: 2, display: 'block' }}>
          Dashboard
        </Button>
        <Button color='inherit' href='/blog' sx={{ my: 2, display: 'block' }}>
          Blog
        </Button>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircle fontSize='large' />
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
          onClose={handleCloseUserMenu}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography onClick={logout}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );

  const authMobileLinks = (
    <>
      <MenuItem>
        <Typography textAlign='center'>
          <Link href='/dashboard' color='inherit' underline='none'>
            Dashboard
          </Link>
        </Typography>
      </MenuItem>
      <MenuItem>
        <Typography textAlign='center'>
          <Link href='/blog' color='inherit' underline='none'>
            Blog
          </Link>
        </Typography>
      </MenuItem>
    </>
  );

  const guestMobileLinks = (
    <>
      {guestLinkProps.map((page) => (
        <MenuItem key={page}>
          <Typography textAlign='center'>
            <Link href={page.toLocaleLowerCase()} color='inherit' underline='none'>
              {page}
            </Link>
          </Typography>
        </MenuItem>
      ))}
    </>
  );

  const guestLinks = (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {guestLinkProps.map((page) => (
          <Button key={page} color='inherit' href={page} sx={{ my: 2, display: 'block' }}>
            {page}
          </Button>
        ))}
      </Box>
    </>
  );

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
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
              color='inherit'>
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
              }}>
              {!loading && <>{isAuthenticated ? authMobileLinks : guestMobileLinks}</>}
            </Menu>
          </Box>
          <Typography
            href='/'
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          </Typography>
          {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
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
