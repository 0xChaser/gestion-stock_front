import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import NavBar from './components/NavBar'; 
import Home from './components/Home'; 
import StockList from './components/StockList'; 
import Login from './components/Login'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/stock-list" element={<StockList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
