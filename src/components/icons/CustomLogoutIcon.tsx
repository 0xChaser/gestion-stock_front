import React from 'react';
import { SvgIcon } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface CustomLogoutIconProps {
  iconStyles: React.CSSProperties;
}

const CustomLogoutIcon: React.FC<CustomLogoutIconProps> = ({ iconStyles }) => (
  <SvgIcon style={iconStyles}>
    <ExitToAppIcon style={{ transform: 'rotate(180deg)', ...iconStyles }} />
  </SvgIcon>
);

export default CustomLogoutIcon;
