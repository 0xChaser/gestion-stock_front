import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CustomButton from '@/components/buttons/CustomButton';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fefefe',
          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873',
          borderRadius: '10px',
          padding: '20px'
        }
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        Confirmer la suppression
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" style={{ marginBottom: '20px' }}>
          Êtes-vous sûr de vouloir supprimer {productName} ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-around" width="100%">
          <CustomButton text="Oui" onClick={onConfirm} />
          <CustomButton text="Non" onClick={onClose} />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationModal;
