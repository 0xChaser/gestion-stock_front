import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../contexts/themeContext';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token } = response.data;
      if (onLoginSuccess) {
        onLoginSuccess();
      }else {
        throw new Error('Token not provided');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Incorrect username or password, or API access problem');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={darkMode ? 3 : 1} sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: darkMode ? 'grey.800' : 'grey.100',
        color: darkMode ? '#ffffff' : '#1423DC',
        width: '100%',
      }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Connexion
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2, color: darkMode ? 'grey.300' : 'grey.700' }}>
          Bienvenue sur E-stock!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, color: darkMode ? 'grey.300' : 'grey.700' }}>
          Veuillez entrer vos identifiants pour accéder au stock.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#1423DC',
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#96CD32',
              }
            }}
          >
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
