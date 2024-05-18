import React, { ReactNode } from 'react';
import { Typography, styled, ThemeProvider, createTheme, } from '@mui/material';
import { useTheme } from '../../contexts/themeContext';

interface CustomTitleProps {
  children: ReactNode;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ children }) => {
  
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: darkMode ? '#96CD32' : '#1423DC',
    fontWeight: 'bold',
    fontSize: '3rem',
    textAlign: 'center',
  }));


  return (
    <ThemeProvider theme={theme}>
    <StyledTypography variant="h1">
      {children}
    </StyledTypography>
    </ThemeProvider>
  );
};

export default CustomTitle;
