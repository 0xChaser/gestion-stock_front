import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Card, Typography, Stack } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import ProductModal from '@/components/modals/addProductModal';
import { useTheme } from '../../themeContext';

function ProductList() {
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
      console.log('Produit ajouté avec succès', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit', error);
      throw error;
    }
  };

  const getRandomColor = () => {
    return `hsla(${Math.random() * 360}, 100%, 85%, 0.6)`;
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
        width: '100%',
        minHeight: '100vh'
      }}>
        <Typography variant="h3" style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', marginTop: 20, textDecoration: 'underline' }}>
          Liste des produits
        </Typography>
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: 2, borderRadius: '15px','&:hover': { bgcolor: '#96CD32'} }}>
          Ajouter un produit
        </Button>
        <ProductModal isOpen={modalIsOpen} onClose={closeModal} onAddProduct={addProduct} />
        {products.map((product, index) => (
          <Card key={index} sx={{
            width: '90%',
            maxWidth: 400,
            bgcolor: getRandomColor(),
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography variant="h6" sx={{ color: '#000', textAlign: 'center' }}>{product.name}</Typography>
            <Typography variant="body2" sx={{ color: '#000', textAlign: 'center' }}>Prix: {product.price}</Typography>
            <Typography variant="body2" sx={{ color: '#000', textAlign: 'center' }}>Catégorie: {product.category}</Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button variant="outlined" onClick={() => console.log('Edit', product.id)}>Modifier</Button>
              <Button variant="outlined" color="error" onClick={() => console.log('Delete', product.id)}>Supprimer</Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default ProductList;
