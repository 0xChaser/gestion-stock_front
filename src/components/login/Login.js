import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../themeContext';
import { Box, Button, TextField, Typography, Container, Paper, Grid } from '@mui/material';

function Login({ onLoginSuccess }) {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token } = response.data;
      if (token) {
        console.log('Connection successful, Token:', token);
        localStorage.setItem('authToken', token);
        onLoginSuccess(token);
      } else {
        throw new Error('Token not provided');
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Incorrect username or password, or API access problem');
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, display: 'flex', justifyContent: 'space-between' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ padding: 1, color: darkMode ? '#ffffff' : '#232876', backgroundColor: darkMode ? 'grey.100' : 'grey.100' }}>
            Welcome to E-stock! Please enter your credentials to access your account and manage the inventory.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={darkMode ? 3 : 1} sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: darkMode ? 'grey.800' : 'grey.100',
            color: darkMode ? '#ffffff' : '#1423DC'
          }}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
              Connexion
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#1423DC', color: '#FFFFFF' }}
              >
                Se connecter
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
