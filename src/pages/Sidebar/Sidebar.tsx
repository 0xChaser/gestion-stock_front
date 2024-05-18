import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Login as LoginIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  ShoppingBag as ShoppingBagIcon,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/themeContext';
import logo from '../../assets/images/logo_Estock.png'; // Correction du chemin
import { styled, Theme } from '@mui/material/styles'; // Notez le changement de '@mui/system' à '@mui/material/styles'

const drawerWidth = 240;

interface AppBarStyledProps {
  open?: boolean;
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface DrawerStyledProps {
  open?: boolean;
}

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerStyledProps>(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpen(!open);
  };

  const iconColor = darkMode ? '#96CD32' : '#1423DC';
  const iconStyles = { color: iconColor };
  const switchStyles = {
    '& .MuiSwitch-thumb': {
      backgroundColor: iconColor,
    },
    '& .MuiSwitch-track': {
      backgroundColor: darkMode ? '#96CD32' : '#1423DC',
    },
  };

  const drawer = (
    <React.Fragment>
      {open && (
        <Box sx={{ width: '100%', p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={logo} alt="Sidebar Logo" style={{ maxHeight: '100px', maxWidth: '100%' }} />
        </Box>
      )}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon style={iconStyles} />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/stock">
            <ListItemIcon>
              <InventoryIcon style={iconStyles} />
            </ListItemIcon>
            <ListItemText primary="Liste du Stock" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login">
            <ListItemIcon>
              <LoginIcon style={iconStyles} />
            </ListItemIcon>
            <ListItemText primary="Log In" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemIcon>
              <PeopleIcon style={iconStyles} />
            </ListItemIcon>
            <ListItemText primary="Liste des utilisateurs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/category">
            <ListItemIcon>
              <CategoryIcon style={iconStyles} />
            </ListItemIcon>
            <ListItemText primary="Liste des catégories" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemIcon>
              <ShoppingBagIcon style={iconStyles} />
            </ListItemIcon>
            <ListItemText primary="Liste des produits" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {open && (
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleTheme}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={switchStyles}
              />
            }
            label="Changer le thème"
            sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}
          />
        </Box>
      )}
    </React.Fragment>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isMobile && (
        <AppBarStyled position="absolute" open={mobileOpen}>
          <Toolbar sx={{ paddingRight: '24px', height: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ marginRight: '36px', width: '100%' }}
            >
              <Typography component="span" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, marginLeft: '8px' }}>
                Menu
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBarStyled>
      )}
      <DrawerStyled variant={isMobile ? 'temporary' : 'permanent'} open={isMobile ? mobileOpen : open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ width: '100%' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        {drawer}
      </DrawerStyled>
    </Box>
  );
};

export default Sidebar;
