import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Card, Typography } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import CategoryModal from '@/components/modals/addCategoryModal';
import { useTheme } from '../../themeContext';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiConfig.get('/category/');
        setCategories(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchCategories();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addCategory = async (category) => {
    try {
      const response = await apiConfig.post('/category/', category);
      setCategories(prevCategories => [...prevCategories, response.data]);
      closeModal();
      console.log('Catégorie ajoutée avec succès', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie');
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await apiConfig.delete(`/category/${categoryId}`);
      setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
      console.log('Catégorie supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
    }
  };

  const editCategory = (category) => {
    console.log('Modification de la catégorie:', category);
  };


  const getRandomColor = () => {
    return `hsla(${Math.random() * 360}, 100%, 75%, 1)`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%'
      }}>
        <Typography variant="h3" style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', marginTop: 20, textDecoration: 'underline' }}>
          Liste des catégories
        </Typography>
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: 2, borderRadius: '15px' ,'&:hover': { bgcolor: '#96CD32'} }}>
          Ajouter une catégorie
        </Button>
        <CategoryModal isOpen={modalIsOpen} onClose={closeModal} onAddCategory={addCategory} />
        {categories.map((category, index) => (
          <Card key={index} sx={{
            width: 300,
            bgcolor: getRandomColor(),
            padding: 2,
            borderRadius: 3,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center' }}>{category.name}</Typography>
            <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>{category.date}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 1 }}>
              <Button variant="contained" color="secondary" onClick={() => editCategory(category)} sx={{ borderRadius: '15px' }}>Modifier</Button>
              <Button variant="contained" color="error" onClick={() => deleteCategory(category.id)} sx={{ borderRadius: '15px' }}>Supprimer</Button>
            </Box>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default CategoryList;
