import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Card, Typography } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import UserModal from '../Modals/addUserModal';
import { useTheme } from '../../contexts/themeContext';

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#232876' },
      background: { paper: darkMode ? '#333' : '#F2F2F2', default: darkMode ? '#121212' : '#fff' },
      text: { primary: darkMode ? '#fff' : '#000' },
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiConfig.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    };
    fetchUsers();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const response = await apiConfig.post('/users', user);
      setUsers(prevUsers => [...prevUsers, response.data]);
      closeModal();
      console.log('Utilisateur ajouté avec succès', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur');
      throw error;
    }
  };
  <
  const editUser = async (userId: number) => {
    console.log('Modifier l\'utilisateur', userId);
  };

  const getRandomColor = () => {
    return `hsla(${Math.random() * 360}, 100%, 75%, 1)`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%'
      }}>
        <Typography variant="h3" style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', marginTop: 20, textDecoration: 'underline' }}>
          Liste des utilisateurs
        </Typography>
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: 2, borderRadius: '15px', '&:hover': { bgcolor: '#96CD32' } }}>
          Ajouter un utilisateur
        </Button>
        <UserModal isOpen={modalIsOpen} onClose={closeModal} onAddUser={addUser} />
        {users.map((user) => (
          <Card key={user.id} sx={{
            width: 300,
            bgcolor: getRandomColor(),
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center' }}>{user.username}</Typography>
            <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>{user.isAdmin ? 'Administrateur' : 'Utilisateur'}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <Button variant="outlined" color="inherit" onClick={() => editUser(user.id)}>Modifier</Button>
              <Button variant="outlined" color="error" onClick={() => deleteUser(user.id)}>Supprimer</Button>
            </Box>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default UserList;
