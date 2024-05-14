import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Switch, FormControlLabel, Box, Divider, IconButton, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '../../themeContext';
import { useMediaQuery } from '@mui/material';
import logo from '../img/logo_enedis.png';

function Sidebar() {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;
  const backgroundColor = darkMode ? '#333' : '#F2F2F2';
  const color = darkMode ? '#fff' : '#1423DC';

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor, color, height: '100%', position: 'relative' },
      }}
    >
      <Box sx={{ width: '100%', p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Sidebar Logo" style={{ maxHeight: '100px', maxWidth: '100%' }} />
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Accueil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/stock">
            <ListItemText primary="Liste du Stock" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login">
            <ListItemText primary="Log In" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemText primary="Liste des utilisateurs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/category">
            <ListItemText primary="Liste des catégories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemText primary="Liste des produits" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Changer le thème"
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 0.5, width: '130px', backgroundColor, color, left: 0 }}>
          <Toolbar
            sx={{
              justifyContent: 'flex-start',
              padding: '0 16px',
              minHeight: mobileOpen ? 56 : 48,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleDrawerToggle}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ color }}>
                Menu
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor, color },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
