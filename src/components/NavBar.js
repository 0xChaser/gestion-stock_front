import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#afeeee'}}>
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stock-list">Liste du Stock</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
