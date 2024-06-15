import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const red = {
  200: '#FF9999',
  300: '#FF6666',
  400: '#FF3333',
  500: '#FF0000',
  600: '#E50000',
  700: '#CC0000',
};

interface CustomButtonProps {
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: red[500],
  color: 'white',
  display: 'inline-flex',
  alignItems: 'center', 
  justifyContent: 'center', 
  '&:hover': {
    backgroundColor: red[600],
  },
  '&:active': {
    backgroundColor: red[700],
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  padding: 0, 
  minWidth: 0,
  height: 40,
  width: 40,
  borderRadius: 8,
}));

const CustomButton: React.FC<CustomButtonProps> = ({ disabled, onClick }) => {
  return (
    <StyledButton
    disabled={disabled}
    onClick={onClick}
  >
      <DeleteIcon />
    </StyledButton>
  );
};

export default CustomButton;
