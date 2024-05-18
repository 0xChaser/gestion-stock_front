import * as React from 'react';
import { Button as BaseButton } from '@mui/base/Button';
import { styled } from '@mui/system';

interface CustomButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}
const red = {
  200: '#FF9999',
  300: '#FF6666',
  400: '#FF3333',
  500: '#FF0000',
  600: '#E50000',
  700: '#CC0000',
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

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${red[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${red[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${red[400]}, inset 0 -2px 1px ${red[600]};

  &:hover {
    background-color: ${red[600]};
  }

  &:active {
    background-color: ${red[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? red[300] : red[200]};
    outline: none;
  }

  &.base--disabled {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`,
);

const CustomButton: React.FC<CustomButtonProps> = ({ text, disabled, onClick }) => {
  return <Button disabled={disabled} onClick={onClick}>{text}</Button>;
};

export default CustomButton;
