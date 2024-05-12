import React, {useState} from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post('auth/login', {
        username,
        password
      });
      const { token } = response.data;

      if (token) {
        console.log('Connexion réussie, Token:', token);
        localStorage.setItem('authToken', token);
        onLoginSuccess(token);
      } else {
        throw new Error('Token non fourni');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      alert('Nom d\'utilisateur ou mot de passe incorrect ou problème d\'acces à l\'api');
    }
  };

  const [hover, setHover] = useState(false);

  const buttonStyle = {
    padding: '10px',
    marginTop: '30px',
    borderRadius: '15px',
    border: 'none',
    backgroundColor: hover ? '#96CD32' : '#1423DC',
    color: 'white',
    cursor: 'pointer',
    width: '150px',
    fontSize: '20px'
}

  return (
    <div style={styles.body}>

        <div style={styles.paragraph}>

            <h5 style={styles.infoTitre}>La connexion sur E-stock vous permet de :  </h5>

            <ul style={styles.list}>
                <li style={styles.itemList}>Visualiser et mettre à jour le stock de matériel informatique</li>
                <li style={styles.itemList}>Gérer les personnes ayant accès à la modification des produits et catégories</li>
            </ul>

        </div>


      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Connexion</h1>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Nom d'utilisateur</label>
          <input
            type="text" 
            id="username"
            name="username"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            style={styles.input}
            required
          />
        </div>
        <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >
            Se connecter
            </button>
      </form>
    </div>
  );
}

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  form: {
    width: '550px',
    height: '400px',
    padding: '20px',
    borderRadius: '15px',
    border: '1px solid #1423DC',
    backgroundColor: '#F2F2F2',
    textAlign: 'center',
    marginTop: '5%'
  },
  header: {
    color: '#232876',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #CECECE',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1423DC',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default Login;
