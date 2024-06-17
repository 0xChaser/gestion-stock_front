import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Grid, Typography, styled, Card, CardContent } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import UserModal from '../Modals/addUserModal';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/AuthContext';
import CustomButton from '../../components/buttons/CustomButton';
import CustomTitle from '../../components/titles/CustomTitle';
import CustomDeleteButton from '../../components/buttons/CustomDeleteButton';
import CustomEditButton from '../../components/buttons/CustomEditButton';
import ToggleViewButton from '../../components/buttons/ToggleViewButton';
import CustomTable from '../../components/tables/CustomTable';
import Avatar from '../../assets/images/avatar.png';

interface User {
  id: number;
  email: string;
  is_superuser: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [view, setView] = useState('module');

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
        const response = await apiConfig.get('/users', {
          headers: {
            'Authorization': `Bearer ${user?.access_token}`
          }
        });
        setUsers(response.data);
        console.log("Ceci est un user", response.data)
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    };

    fetchUsers();
  }, [user]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addUser = async (userData: { email: string; is_active: boolean; is_verified: boolean; }) => {
    try {
      const response = await apiConfig.post('/auth/register', userData, {
        headers: {
          'Authorization': `Bearer ${user?.access_token}`
        }
      });
      const newUser: User = {
        id: response.data.id,
        email: response.data.email,
        is_superuser: response.data.is_superuser,
      };
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await apiConfig.delete(`/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${user?.access_token}`
        }
      });
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      console.log('Utilisateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur', error);
    }
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: darkMode ? '#0a1929' : '#F0F7FF',
    boxShadow: theme.shadows[3],
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    border: darkMode ? '1px solid #2a384e' : '1px solid #66B3FF',
    color: darkMode ? '#ffffff' : '#303741',
    '&:hover': {
      boxShadow: theme.shadows[6],
      border: '1px solid #3ea6ff',
    },

    width: '400px', 

  }));

  const UserImage = styled('img')({
    width: 60,
    height: 60,
    borderRadius: '50%',
  });

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const columns = [
    { id: 'email', label: 'Email' },
    { id: 'is_superuser', label: 'Role', align: 'right', format: (value: boolean) => value ? 'Administrateur' : 'Utilisateur' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <CustomTitle>Liste des Utilisateurs</CustomTitle>

        <ToggleViewButton view={view} handleChange={handleViewChange} />

        <UserModal isOpen={modalIsOpen} onClose={closeModal} onAddUser={addUser} />

        {view === 'module' ? (
          <Grid container mt={5}>
            {users.map((user) => (
              <Grid item xs={6} sm={4} md={3} key={user.id}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <UserImage src={Avatar} alt="User avatar" />
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Typography variant="body1" component="div">
                          {user?.email}
                        </Typography>
                        <Typography variant="subtitle1">
                          {user?.is_superuser ? 'Administrateur' : 'Utilisateur'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
                      <CustomEditButton text="Modifier" onClick={() => console.log('Modifier', user.id)} disabled={false} />
                      <CustomDeleteButton text="Supprimer" onClick={() => deleteUser(user.id)} disabled={false} />
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ width: '100%' }}>
            <CustomTable
              columns={columns}
              data={users}
              onEdit={(user) => console.log('Edit', user)}
              onDelete={(user) => deleteUser(user.id)}
            />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default UserList;
