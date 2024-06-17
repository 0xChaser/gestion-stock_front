import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminGuard: React.FC = () => {
  const { user } = useAuth();

  console.log('AdminGuard - user:', user);

  return user && user.is_superuser ? <Outlet /> : <Navigate to="/home" />;
};

export default AdminGuard;
