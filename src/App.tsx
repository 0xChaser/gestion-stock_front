import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/themeContext';
import { Sidebar, Home, StockList, UserList, Login, CategoryList, ProductList } from './pages';
import { useMediaQuery, Toolbar } from '@mui/material';

const drawerWidth = 240;

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {isMobile && <Toolbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stock" element={<StockList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/category" element={<CategoryList />} />
              <Route path="/products" element={<ProductList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
