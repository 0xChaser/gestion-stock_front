import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Card, Typography, Stack } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import ProductModal from '@/components/modals/addProductModal';
import DeleteConfirmationModal from '@/components/modals/DeleteModal';
import { useTheme } from '../../themeContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
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
        const response = await apiConfig.get('/product/');
        setProducts(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchProducts();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalIsOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalIsOpen(false);

  const addProduct = async (product) => {
    try {
      const response = await apiConfig.post('/product/', product);
      setProducts(prevProducts => [...prevProducts, response.data]);
      closeModal();
      console.log('Produit ajouté avec succès', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit', error);
      throw error;
    }
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await apiConfig.delete(`/product/${productToDelete.id}`);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete.id));
        closeDeleteModal();
        console.log('Produit supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression du produit', error);
      }
    }
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
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: 2, borderRadius: '15px', '&:hover': { bgcolor: '#96CD32'} }}>
          Ajouter un produit
        </Button>
        <ProductModal isOpen={modalIsOpen} onClose={closeModal} onAddProduct={addProduct} />
        <DeleteConfirmationModal
          isOpen={deleteModalIsOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteProduct}
          productName={productToDelete ? productToDelete.name : ''}
        />
        {products.map((product, index) => (
          <Card key={index} sx={{
            width: '90%',
            maxWidth: 400,
            bgcolor: '#232876',
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
              <Button variant="outlined" color="error" onClick={() => openDeleteModal(product)}>Supprimer</Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default ProductList;
