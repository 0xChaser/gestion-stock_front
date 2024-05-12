import React, { useState, useEffect } from 'react';
import apiConfig from '@/api/apiConfig';
import UserModal from '@/components/modals/addUserModal';

function UserList() {
  const [users, setUsers] = useState([]);
  const [ModalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await apiConfig.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchUsers();
  }, []);


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  const addUser = async (user) =>{
    try{
       const response = await apiConfig.post('/TODO', user)
       setUsers(prevUsers => [...prevUsers, response.data]);
       closeModal();
       console.log('Utilisateur ajouté avec succès', response.data);
       return response.data;
    } catch(error){
      console.error('Erreur lors de l\'ajout de l\'utilisateur')
      throw error
    }
  }

  const [hover, setHover] = useState(false);

  const buttonStyle = {
    padding: '10px',
    marginTop: '30px',
    borderRadius: '15px',
    border: 'none',
    backgroundColor: hover ? '#96CD32' : '#1423DC',
    color: 'white',
    cursor: 'pointer',
    width: '250px',
    fontSize: '18px'
}

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Liste des utilisateurs</h1>
      
      <button
      type="submit"
      style={buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={openModal}
      >
      Ajouter un utilisateur
      </button>
      <UserModal isOpen={ModalIsOpen} onClose={closeModal} onAddUser={addUser} />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Rôle de l'utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={styles.td}>{user.username}</td>
              <td style={styles.td}>{user.isAdmin ? 'Administrateur' : 'Utilisateur'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

  const styles = {
    container: {
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      color: '#232876',
      textAlign: 'center',
      marginTop: '1.8%',
      fontSize: '60px',
    },
    table: {
      borderCollapse: 'collapse',
      margin: '20px 0',
      fontSize: '20px',
    },
    th: {
      border: '0.3px solid #cecece',
      backgroundColor: '#232876',
      color: 'white',
      textAlign: 'center',
      padding: '15px',
      fontSize: '25px',
      fontWeight: 'bold',
    },
    td: {
      border: '1px solid #cecece',
      textAlign: 'center',
      padding: '15px',
      verticalAlign: 'middle',
    }
  };
export default UserList;
