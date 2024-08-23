import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const AdminHeader = ({ onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0f2d2f', zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          KEMPSEY
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src="your-avatar-url.jpg" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: '45px' }} // Adjusted margin for alignment
          >
            <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar src="your-avatar-url.jpg" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1">Hi, tec!</Typography>
                <Typography variant="body2" color="text.secondary">
                  tecrdx@gmail.com
                </Typography>
              </Box>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose}>
              <Button
                component={Link}
                to="/admin-dashboard/setting"
                sx={{ justifyContent: 'flex-start', textTransform: 'none', width: '100%' }}
              >
                Manage your Google Account
              </Button>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <Button
                component={Link}
                to="/logout"
                sx={{ justifyContent: 'flex-start', textTransform: 'none', width: '100%' }}
              >
                Sign out
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
  