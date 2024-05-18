import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  autoHideDuration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 6000
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
