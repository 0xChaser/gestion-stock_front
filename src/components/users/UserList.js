import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import UserModal from '@/components/modals/addUserModal';
import { useTheme } from '../../themeContext';

function UserList() {
  const [users, setUsers] = useState([]);
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

  const addUser = async (user) => {
    try {
      const response = await apiConfig.post('/TODO', user);
      setUsers(prevUsers => [...prevUsers, response.data]);
      closeModal();
      console.log('Utilisateur ajouté avec succès', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur');
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    console.log('Supprimer l\'utilisateur', userId);
  };

  const editUser = async (userId) => {
    console.log('Modifier l\'utilisateur', userId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: 3,
        margin: 0,
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        backgroundColor: 'background.paper',
        borderRadius: 0,
        boxShadow: 3,
      }}>
        <h1 style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', fontSize: '2.5rem', marginTop: '1.8%', textDecoration: 'underline'}}>Liste des utilisateurs</h1>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, marginTop: '1.8%' }}>
          <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', borderRadius: '15px','&:hover': { bgcolor: '#96CD32'}  }}>
            Ajouter un utilisateur
          </Button>
        </Box>
        <UserModal isOpen={modalIsOpen} onClose={closeModal} onAddUser={addUser} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', borderRight: 2, border: '1px solid #FFFFFF'}}>Nom de l'utilisateur</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF'}}>Rôle de l'utilisateur</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{user.username}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{user.isAdmin ? 'Administrateur' : 'Utilisateur'}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>
                  {user.isAdmin && (
                    <>
                      <Button color="primary" onClick={() => editUser(user.id)}>Modifier</Button>
                      <Button color="error" onClick={() => deleteUser(user.id)}>Supprimer</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default UserList;
