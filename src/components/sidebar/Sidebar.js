import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Switch, FormControlLabel, Box, Divider } from '@mui/material';
import { useTheme } from '../../themeContext';
import logo from '../img/logo_enedis.png'; 

function Sidebar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: darkMode ? '#333' : '#F2F2F2', color: darkMode ? '#fff' : '#1423DC' },
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
          control={<Switch checked={darkMode} onChange={toggleTheme} />}
          label="Mode Sombre"
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Box>
    </Drawer>
  );
}

export default Sidebar;
