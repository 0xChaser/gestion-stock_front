import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../api/apiConfig';

const Logout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      if (user && user.access_token) {
        try {
          await ApiClient.post('/auth/logout', {}, {
            headers: {
              'Authorization': `Bearer ${user.access_token}`
            }
          });
          logout();
          navigate('/login');
        } catch (error) {
          console.error('Logout error:', error);
          alert('Failed to logout. Please try again.');
        }
      } else {
        logout();
        navigate('/login');
      }
    };

    performLogout();
  }, [user, logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
