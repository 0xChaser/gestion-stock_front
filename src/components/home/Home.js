import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../themeContext';
import StockImage from '../img/image_stock.png';


function HomePage() {
  
  const { darkMode } = useTheme();

  return (
    <Paper sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        padding: '15px',
        borderRadius: '15px',
        border: '1px solid #1423DC',
        bgcolor: darkMode ? '#333' : '#F2F2F2',
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
      
      <Typography variant="h5" component="h1" gutterBottom sx={{
        color: darkMode ? '#FFFFFF' : '#232876',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Bienvenue sur <span style={{color: '#96CD32'}}> E-Stock</span>, l'application de gestion de matériel informatique de <br />l'agence Acheminement de Grenelle
      </Typography>
</Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <img src={StockImage} alt="Stock Management" style={{ width: '100%', maxWidth: '600px', height: 'auto', margin: '20px' }} />
        <Typography paragraph sx={{ maxWidth: '600px', textAlign: 'center', fontSize: '18px' }}>
          Pour palier a la disparition et la perte du matériel informatique des agents, notre innovation "E-Stock" facilite le suivi pour les managers
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: '20px'
      }}>
        <Button variant="contained" component={Link} to="/stock" sx={{width: '80%', maxWidth: '300px', bgcolor:'#1423DC', padding:'15px', color: '#FFFFFF','&:hover': { bgcolor: '#96CD32'} }}>
          Voir le stock
        </Button>
        <Button variant="contained" component={Link} to="/login" sx={{ width: '100%', maxWidth: '400px', bgcolor:'#1423DC', padding:'15px', color: '#FFFFFF','&:hover': { bgcolor: '#96CD32'} }}>
          Se connecter en tant qu'administrateur
        </Button>
      </Box>
    </Paper>
  );
}

export default HomePage;