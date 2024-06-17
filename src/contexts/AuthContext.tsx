import React, { createContext, useState, useContext, ReactNode } from 'react';
import ApiConfig from '../api/apiConfig';

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  username: string;
  access_token: string;
  is_superuser: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await ApiConfig.post('/auth/login', new URLSearchParams({
        grant_type: 'password',
        username,
        password,
      }).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const { access_token } = response.data;

      const userDetailsResponse = await ApiConfig.get('/users/me', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      const { is_superuser, email: fetchedUsername } = userDetailsResponse.data;
      setUser({ username: fetchedUsername, access_token, is_superuser });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
