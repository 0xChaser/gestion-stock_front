import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SuperuserGuardProps {
  children: React.ReactNode;
}

const SuperuserGuard: React.FC<SuperuserGuardProps> = ({ children }) => {
  const { user } = useAuth();

  if (user?.is_superuser) {
    return <>{children}</>;
  }

  return null;
};

export default SuperuserGuard;
