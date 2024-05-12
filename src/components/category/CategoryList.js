import React, { useState, useEffect } from 'react';
import apiConfig from '@/api/apiConfig';
import CategoryModal from '@/components/modals/addCategoryModal';

function CategoryList() {

  const [category, setCategory] = useState([]);
  const [ModalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await apiConfig.get('/category/');
        console.log('Réponse API:', response.data);
        setCategory(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchCategory();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addCategory = async (category) =>{
    try{
       const response = await apiConfig.post('/category/', category)
       setCategory(prevCategory => [...prevCategory, response.data]);
       closeModal();
       console.log('Catégorie ajoutée avec succès', response.data);
       return response.data;
    } catch(error){
      console.error('Erreur lors de l\'ajout de la catégorie')
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
      <h1 style={styles.title}>Liste des catégories</h1>
      
      <button
      type="submit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={openModal}
      style={buttonStyle}
      >
      Ajouter une catégorie
      </button>
      <CategoryModal isOpen={ModalIsOpen} onClose={closeModal} onAddCategory={addCategory} />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nom de la catégorie</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category, index) => (
            <tr key={index}>
              <td style={styles.td}>{category.name}</td>
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
export default CategoryList;
