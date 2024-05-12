import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
      primary: { main: '#232876' },
      background: { paper: darkMode ? '#333' : '#F2F2F2', default: darkMode ? '#121212' : '#fff' },
      text: { primary: darkMode ? '#fff' : '#000' },
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: 3,
        margin: 0,
        width: '100%',
        height: '100%',
        maxWidth: 'none',
        backgroundColor: 'background.paper',
        borderRadius: 0,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', fontSize: '2.5rem', marginTop: '1.8%', textDecoration: 'underline' }}>Liste des catégories</h1>
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: '1.8%', borderRadius: '15px' ,'&:hover': { bgcolor: '#96CD32'} }}>
          Ajouter une catégorie
        </Button>
        <CategoryModal isOpen={modalIsOpen} onClose={closeModal} onAddCategory={addCategory} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Nom de la catégorie</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{category.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default CategoryList;
