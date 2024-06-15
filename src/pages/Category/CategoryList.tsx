import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Grid, Typography, styled, Card, CardContent } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import AddCategoryModal from '../Modals/addCategoryModal';
import EditCategoryModal from '../Modals/editCategoryModal';
import DeleteConfirmationModal from '../Modals/DeleteModal';
import CustomSnackbar from '../../components/snackbar/CustomSnackbar';
import { useTheme } from '../../contexts/themeContext';
import CustomButton from '../../components/buttons/CustomButton';
import CustomDeleteButton from '../../components/buttons/CustomDeleteButton';
import CustomEditButton from '../../components/buttons/CustomEditButton';
import CustomTitle from '../../components/titles/CustomTitle';
import ToggleViewButton from '../../components/buttons/ToggleViewButton';
import CustomTable from '../../components/tables/CustomTable';

interface Category {
  id: string;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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

  const fetchCategories = async () => {
    try {
      const response = await apiConfig.get('/category/');
      const sortedCategories = response.data.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
      setCategories(sortedCategories);
    } catch (error) {
      console.error('Problème de récupération', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setSelectedCategory(null);
    setEditModalIsOpen(false);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalIsOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setDeleteModalIsOpen(false);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const addCategory = async (formData: { name: string }) => {
    try {
      await apiConfig.post('/category/', formData);
      fetchCategories();
      setSnackbarMessage('Catégorie ajoutée avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie', error);
    }
  };

  const editCategory = async (id: string, formData: { name: string }) => {
    try {
      await apiConfig.patch(`/category/${id}`, formData);
      fetchCategories();
      setSnackbarMessage('Catégorie modifiée avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la modification de la catégorie', error);
    }
  };

  const deleteCategory = async () => {
    if (selectedCategory === null) return;
    try {
      console.log('Deleting category with ID:', selectedCategory.id);
      await apiConfig.delete(`/category/${selectedCategory.id}`);
      closeDeleteModal();
      fetchCategories(); 
      setSnackbarMessage('Catégorie supprimée avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
    }
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const columns = [
    { id: 'name', label: 'Nom de la Catégorie' },
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
        <CustomTitle>Liste des Catégories</CustomTitle>
        <CustomButton text="Ajouter une Catégorie" onClick={openModal} disabled={false} />
        <ToggleViewButton view={view} handleChange={handleViewChange} />

        <AddCategoryModal isOpen={modalIsOpen} onClose={closeModal} onAddCategory={addCategory} />
        {selectedCategory && (
          <EditCategoryModal
            isOpen={editModalIsOpen}
            onClose={closeEditModal}
            onEditCategory={editCategory}
            category={selectedCategory}
          />
        )}
        <DeleteConfirmationModal
          isOpen={deleteModalIsOpen}
          onClose={closeDeleteModal}
          onConfirm={deleteCategory}
          productName={selectedCategory?.name || ''}
        />

        {view === 'module' ? (
          <Grid container spacing={5}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="div">
                        {category.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 3 }}>
                      <CustomEditButton text="Modifier" onClick={() => openEditModal(category)} disabled={false} />
                      <CustomDeleteButton text="Supprimer" onClick={() => openDeleteModal(category)} disabled={false} />
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
              data={categories}
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

export default CategoryList;
