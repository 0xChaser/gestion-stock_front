import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';

interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
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

const StyledFormControl = styled(FormControl)(
  ({ theme }) => `
  width: 200px;
  margin-left: 16px;
  .MuiInputLabel-root {
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
  }
  .MuiOutlinedInput-root {
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${blue[500]};
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${blue[500]};
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: ${grey[400]};
    }
  }
  .MuiSelect-select {
    padding: 8px 16px;
    background-color: ${blue[500]};
    color: white;
    border-radius: 8px;
    transition: all 150ms ease;
    &:hover {
      background-color: ${blue[600]};
    }
    &:active {
      background-color: ${blue[700]};
    }
  }
  .MuiSvgIcon-root {
    color: white;
  }
`,
);

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange }) => {
  return (
    <StyledFormControl variant="outlined" size="small">
      <Select
        labelId="role-select-label"
        id="role-select"
        value={value}
        onChange={onChange}
        label="Filtrer par rôle"
      >
        <MenuItem value="all">Tous</MenuItem>
        <MenuItem value="admin">Admins</MenuItem>
        <MenuItem value="user">Utilisateurs</MenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default CustomSelect;
