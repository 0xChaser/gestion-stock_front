import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Box, Typography, InputLabel, Snackbar, Alert } from '@mui/material';
import CustomButton from '../../components/buttons/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import { useAuth } from '../../contexts/AuthContext';
import apiConfig from '../../api/apiConfig';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
  is_superuser: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    is_superuser: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apiConfig.post('/auth/register', formData, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      console.log('Réponse de l\'API:', response.data);
      setSnackbarOpen(true);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6">Ajouter un Utilisateur</Typography>
          <form onSubmit={handleSubmit}>
            <InputLabel>Email</InputLabel>
            <CustomInput name="email" type="email" value={formData.email} onChange={handleChange} required />
            <InputLabel>Mot de passe</InputLabel>
            <CustomInput name="password" type="password" value={formData.password} onChange={handleChange} required />
            <InputLabel>Superuser</InputLabel>
            <CustomInput name="is_superuser" type="checkbox" checked={formData.is_superuser} onChange={handleChange} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CustomButton text="Ajouter" type="submit" />
            </Box>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Utilisateur ajouté avec succès !
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserModal;
