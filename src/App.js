import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './themeContext'; 
import Sidebar from './components/sidebar/Sidebar'; 
import Home from './components/home/Home';
import StockList from './components/stock/index';
import UserList from './components/users/UserList';
import Login from './components/login/Login';
import CategoryList from './components/category/CategoryList';
import ProductList from './components/products/ProductList';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<Home />} exact />
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
