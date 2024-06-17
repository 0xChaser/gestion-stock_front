import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/themeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Sidebar, Home, StockList, UserList, CategoryList, ProductList, Login, Logout } from './pages';
import AuthGuard from './guards/AuthGuard';
import AdminGuard from './guards/AdminGuard';
import { useMediaQuery, Toolbar } from '@mui/material';

const drawerWidth = 240;

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main
              style={{
                flexGrow: 1,
                marginLeft: isMobile ? 0 : drawerWidth,
                width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
                overflowY: 'auto',
              }}
            >
              {isMobile && <Toolbar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route element={<AuthGuard />}>
                  <Route path="/stock" element={<StockList />} />
                  <Route element={<AdminGuard />}>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/category" element={<CategoryList />} />
                    <Route path="/product" element={<ProductList />} />
                  </Route>
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
