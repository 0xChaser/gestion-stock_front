import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import CategoryModal from '@/components/modals/addProductModal';
import { useTheme } from '../../themeContext';

function CategoryList() {
  const [products, setProducts] = useState([]);
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
    async function fetchProducts() {
      try {
        const response = await apiConfig.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchProducts();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addProduct = async (product) => {
    try {
      const response = await apiConfig.post('/products/', product);
      setProducts(prevProducts => [...prevProducts, response.data]);
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
        <h1 style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', fontSize: '2.5rem', marginTop: '1.8%', textDecoration: 'underline' }}>Liste des produits</h1>
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: '1.8%', borderRadius: '15px','&:hover': { bgcolor: '#96CD32'}  }}>
          Ajouter un produit
        </Button>
        <CategoryModal isOpen={modalIsOpen} onClose={closeModal} onAddProduct={addProduct} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Nom du produit</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Prix du produit</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Catégorie du Produit</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{product.name}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{product.price}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{product.category}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{product.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default CategoryList;
