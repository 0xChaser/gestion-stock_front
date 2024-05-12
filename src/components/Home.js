import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (

    <div className="home-container">

      <h1 className="title">Bienvenue sur E-Stock</h1>

      <div className="buttons-container">

        <Link to="/stock" className="link-button">Voir le stock</Link>
        <Link to="/login" className="link-button">Se connecter</Link>

      </div>

    </div>

  );
}

export default Home;
