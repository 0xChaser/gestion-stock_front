import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <ul className="navbar-nav flex-column">
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link active" aria-current="page" to="/" style={styles.navLink}>Accueil</Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/stock" style={styles.navLink}>Liste du Stock</Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/login" style={styles.navLink}>Log In</Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/users" style={styles.navLink}>Liste des utilisateurs</Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/category" style={styles.navLink}>Liste des catégories</Link>
            </li>
            <li className="nav-item" style={styles.navItem}>
              <Link className="nav-link" to="/products" style={styles.navLink}>Liste des produits</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: '200px',
    overflow: 'auto',
    backgroundColor: '#F2F2F2',
    padding: '10px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
  },
  navItem:{
    display: 'inline-block'
  },
  navLink: {
    color: '#1423DC',
    padding: '10px 20px', 
    display: 'block'
  }
};

export default Sidebar;