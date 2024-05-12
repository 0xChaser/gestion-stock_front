import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import SideBar from '@/components/sidebar/index'; 
import Home from '@/components/Home'; 
import StockList from '@/components/stock/index'; 
import UserList from '@/components/users/index'; 
import Login from '@/components/login/index'; 
import CategoryList from '@/components/category/CategoryList'; 
 

const App = () => {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/stock" element={<StockList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/category" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
