import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useTheme } from '@mui/material/styles';
import { Box, InputLabel, Typography, Snackbar, Alert } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import CustomButton from '../../components/buttons/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditUser: (id: string, formData: FormData) => void;
  user: User | null;
}

interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

interface FormData {
  email: string;
  password?: string;
  is_superuser: boolean;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onEditUser, user }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    is_superuser: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        // password: '',
        is_superuser: user.is_superuser,
      });
    }
  }, [user]);

  const theme = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    const updatedUser = {
      email: formData.email,
      // password: formData.password || undefined,
      is_active: user.is_active,
      is_superuser: formData.is_superuser,
      is_verified: user.is_verified,
    };

    try {
      const response = await apiConfig.patch(`/user/${user.id}`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${authUser?.access_token}`
        }
      });
      console.log('Réponse de l\'API:', response.data);
      onEditUser(user.id, updatedUser);
      setSnackbarOpen(true);
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Erreur lors de la modification de l\'utilisateur', error.response?.data);
      } else {
        console.error('Erreur lors de la modification de l\'utilisateur', (error as Error).message);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <Typography variant="h6" className="modal-title">
            Modifier un utilisateur
          </Typography>
          <form onSubmit={handleSubmit} className="modal-form">
            <InputLabel htmlFor="email" className="modal-label">Email</InputLabel>
            <CustomInput name="email" value={formData.email} onChange={handleChange} required />

            {/* <InputLabel htmlFor="password" className="modal-label">Mot de passe</InputLabel>
            <CustomInput name="password" type="password" value={formData.password} onChange={handleChange} /> */}

            <InputLabel htmlFor="is_superuser" className="modal-label">Superuser</InputLabel>
            <CustomInput name="is_superuser" type="checkbox" checked={formData.is_superuser} onChange={handleChange} />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CustomButton text="Modifier" type="submit" disabled={false} />
            </Box>
          </form>
        </ModalContent>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Utilisateur modifié avec succès !
        </Alert>
      </Snackbar>
    </>
  );
};

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className?: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={open ? "base-Backdrop-open " + (className || "") : className || ""}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    & .modal-label {
      font-weight: 600;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    }
  `,
);

export default EditUserModal;

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
