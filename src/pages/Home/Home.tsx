import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Typography } from '@mui/material';
import StockImage from '../../assets/images/image_stock.png';
import { useTheme } from '../../contexts/themeContext';
import CustomTitle from 'components/titles/CustomTitle';
import SuperuserGuard from '../../guards/SuperuserGuard';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#232876' },
      background: { paper: darkMode ? '#333' : '#F2F2F2', default: darkMode ? '#121212' : '#fff' },
      text: { primary: darkMode ? '#fff' : '#000' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ textAlign: 'center', padding: 3 }}>
        <CustomTitle>
          Bienvenue sur E-Stock!
        </CustomTitle>
        <img src={StockImage} alt="Stock" style={{ minWidth: '45%', width:'100%', maxWidth:'700px', height: 'auto' }} />
        <Box sx={{ marginTop: 3, display: 'flex', alignItems:'center', justifyContent:'space-evenly'}}>

          <Button component={Link} to="/stock" variant="contained" color="primary">
            Voir le stock
          </Button>
          
          <SuperuserGuard>

            <Button component={Link} to="/category" variant="contained" color="primary">
              Voir les catégories
            </Button>

            <Button component={Link} to="/product" variant="contained" color="primary">
              Voir les produits
            </Button>

          </SuperuserGuard>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
