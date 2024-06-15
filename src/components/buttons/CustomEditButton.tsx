import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
  };
  

interface CustomButtonProps {
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: blue[400],
  color: 'white',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: blue[500],
  },
  '&:active': {
    backgroundColor: blue[600],
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  padding: 0, 
  minWidth: 0,
  height: 48,
  width: 48,
  borderRadius: 8,
}));

const CustomButton: React.FC<CustomButtonProps> = ({ disabled, onClick }) => {
  return (
    <StyledButton
      startIcon={<EditIcon />}
      disabled={disabled}
      onClick={onClick}
    >
    </StyledButton>
  );
};

export default CustomButton;
