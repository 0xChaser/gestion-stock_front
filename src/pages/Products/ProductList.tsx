import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Grid, Typography, styled, Card, CardContent } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import AddProductModal from '../Modals/addProductModal';
import EditProductModal from '../Modals/editProductModal';
import DeleteConfirmationModal from '../Modals/DeleteModal';
import CustomSnackbar from '../../components/snackbar/CustomSnackbar';
import { useTheme } from '../../contexts/themeContext';
import CustomButton from '../../components/buttons/CustomButton';
import CustomDeleteButton from '../../components/buttons/CustomDeleteButton';
import CustomEditButton from '../../components/buttons/CustomEditButton';
import CustomTitle from '../../components/titles/CustomTitle';
import ToggleViewButton from '../../components/buttons/ToggleViewButton';
import CustomTable from '../../components/tables/CustomTable';

interface Product {
  id: string;
  name: string;
  price: number;
  categories: { id: string; name: string; }[];
}
 
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [view, setView] = useState('module');
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: darkMode ? '#0a1929' : '#F0F7FF',
    boxShadow: theme.shadows[3],
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: darkMode ? '1px solid #2a384e' : '1px solid #66B3FF',
    color: darkMode ? '#ffffff' : '#303741',
    '&:hover': {
      boxShadow: theme.shadows[6],
      border: '1px solid #3ea6ff',
    },
  }));

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await apiConfig.get('/product/');
        const sortedProducts = response.data.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchProducts();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalIsOpen(false);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalIsOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setDeleteModalIsOpen(false);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const addProduct = async (formData: { name: string; price: number; categories: { id: string; name: string; }[] }) => {};

  const editProduct = async (id: string, formData: { name: string; price: number; categories: { id: string; name: string; }[] }) => {};

  const deleteProduct = async () => {
    if (selectedProduct === null) return;
    try {
      await apiConfig.delete(`/product/${selectedProduct.id}`);
      setProducts(prevProducts => prevProducts.filter(prod => prod.id !== selectedProduct.id));
      closeDeleteModal();
      setSnackbarMessage('Produit supprimé avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const columns = [
    { id: 'name', label: 'Nom du Produit' },
    { id: 'price', label: 'Prix (en €)', align: 'right' },
    { id: 'categories', label: 'Catégories', align: 'right', format: (value: any) => value.map((category: any) => category.name).join(', ') || 'Pas de catégorie' }
  ];

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
        <CustomTitle>Liste des Produits</CustomTitle>
        <CustomButton text="Ajouter des Produits" onClick={openModal} disabled={false} />
        <ToggleViewButton view={view} handleChange={handleViewChange} />

        <AddProductModal isOpen={modalIsOpen} onClose={closeModal} onAddProduct={addProduct} />
        {selectedProduct && (
          <EditProductModal
            isOpen={editModalIsOpen}
            onClose={closeEditModal}
            onEditProduct={editProduct}
            product={selectedProduct}
          />
        )}
        <DeleteConfirmationModal
          isOpen={deleteModalIsOpen}
          onClose={closeDeleteModal}
          onConfirm={deleteProduct}
          productName={selectedProduct?.name || ''}
        />

        {view === 'module' ? (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={4} md={4} lg={3} key={product.id}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {product.price} €
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Catégorie(s): {product.categories.map(cat => cat.name).join(', ') || 'Pas de catégorie'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 3 }}>
                      <CustomEditButton text="Modifier" onClick={() => openEditModal(product)} disabled={false} />
                      <CustomDeleteButton text="Supprimer" onClick={() => openDeleteModal(product)} disabled={false} />
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ width: '100%' }}>
            <CustomTable
              columns={columns}
              data={products}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          </Box>
        )}

        <CustomSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={handleSnackbarClose}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ProductList;
