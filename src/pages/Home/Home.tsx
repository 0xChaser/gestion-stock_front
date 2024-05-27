import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Typography } from '@mui/material';
import StockImage from '../../assets/images/image_stock.png';
import { useTheme } from '../../contexts/themeContext';

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
        <Typography variant="h3" style={{ color: darkMode ? '#96CD32' : '#232876', marginBottom: 20 }}>
          Bienvenue sur E-Stock!
        </Typography>
        <img src={StockImage} alt="Stock" style={{ maxWidth: '100%', height: 'auto' }} />
        <Box sx={{ marginTop: 3 }}>
          <Button component={Link} to="/stock" variant="contained" color="primary">
            Voir le stock
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
