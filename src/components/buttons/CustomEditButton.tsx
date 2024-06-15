import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const green = {
  100: '#EAF8D0',
  200: '#C8EB8E',
  400: '#96CD32',
  500: '#7BB82B',
  600: '#669924',
};
  

interface CustomButtonProps {
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[400],
  color: 'white',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: green[500],
  },
  '&:active': {
    backgroundColor: green[600],
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
      <EditIcon />
    </StyledButton>
  );
};

export default CustomButton;
