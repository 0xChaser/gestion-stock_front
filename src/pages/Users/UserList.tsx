import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/AuthContext';
import CustomTitle from '../../components/titles/CustomTitle';
import CustomTable from '../../components/tables/CustomTable';
import CustomSelectButton from '../../components/selects/CustomSelect';
import { SelectChangeEvent } from '@mui/material';
import EditUserModal from '../Modals/editUserModal';
import CustomButton from '../../components/buttons/CustomButton';

interface User {
  id: string;
  email: string;
  is_superuser: boolean;
  is_active: boolean;
  is_verified: boolean;
}

interface FormData {
  email: string;
  password?: string;
  is_superuser: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { darkMode } = useTheme();
  const { user } = useAuth();

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
        console.log("Ceci est un user", response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    };

    fetchUsers();
  }, [user]);

  const openModal = (user: User) => {
    console.log('Open Modal', user);
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const handleRoleFilterChange = (event: SelectChangeEvent<string>) => {
    setRoleFilter(event.target.value as 'all' | 'admin' | 'user');
  };

  const handleEditUser = (id: string, updatedUser: FormData) => {
    setUsers(users.map(user => user.id === id ? { ...user, ...updatedUser } : user));
  };

  const filteredUsers = users.filter(user => {
    if (roleFilter === 'admin') return user.is_superuser;
    if (roleFilter === 'user') return !user.is_superuser;
    return true;
  });

  const columns = [
    { id: 'email', label: 'Email' },
    { id: 'is_superuser', label: 'Role', align: 'right', format: (value: boolean) => value ? 'Administrateur' : 'Utilisateur' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
        <CustomTitle>Liste des Utilisateurs</CustomTitle>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} mb={3} mt={5}>
          <CustomSelectButton value={roleFilter} onChange={handleRoleFilterChange} />
        </Box>

        <EditUserModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          onEditUser={handleEditUser}
          user={selectedUser}
        />

        <Box sx={{ width: '100%' }} mt={6}>
          <CustomTable
            columns={columns}
            data={filteredUsers}
            onEdit={openModal}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserList;
