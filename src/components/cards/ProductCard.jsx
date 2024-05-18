import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fefefe',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873',
  borderRadius: 10,
  padding: 20,
  textAlign: 'center',
  boxShadow: theme.palette.mode === 'dark'
    ? '0px 4px 12px rgba(0, 0, 0, 0.5)'
    : '0px 4px 12px rgba(0, 0, 0, 0.2)',
}));

const InfoCard = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
          Material UI
        </Typography>
        <Typography variant="body2">
          An open-source React component library that implements Google's Material Design.
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default InfoCard;
