import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

interface ToggleViewButtonProps {
  view: string;
  handleChange: (event: React.MouseEvent<HTMLElement>, nextView: string) => void;
}

const ToggleViewButton: React.FC<ToggleViewButtonProps> = ({ view, handleChange }) => {
  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={view}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
    >
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleViewButton;
