import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
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
import CustomTable from '../../components/tables/CustomTable';
import { useAuth } from '../../contexts/AuthContext';

export interface Category {
  id: string;
  name: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiConfig.get('/category/');
    const sortedCategories = response.data.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
    return sortedCategories;
  } catch (error) {
    console.error('Problème de récupération', error);
    throw error;
  }
};

export { fetchCategories };

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { darkMode } = useTheme();
  const { user } = useAuth();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    };
    getCategories();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditModalIsOpen(true);
  };
  const closeEditModal = async () => {
    setSelectedCategory(null);
    setEditModalIsOpen(false);
    await fetchCategories().then(fetchedCategories => {
      setCategories(fetchedCategories);
    });
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

  const deleteCategory = async () => {
    if (selectedCategory === null) return;

    try {
      console.log('Deleting category with ID:', selectedCategory.id);
      await apiConfig.delete(`/category/${selectedCategory.id}`, {
        headers: {
          'Authorization': `Bearer ${user?.access_token}`
        }
      });
      await fetchCategories().then(fetchedCategories => {
        setCategories(fetchedCategories);
      });
      closeDeleteModal();
      setSnackbarMessage('Catégorie supprimée avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
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

        <AddCategoryModal isOpen={modalIsOpen}
          onClose={closeModal}
          onAddCategory={async () => {
            await fetchCategories().then(fetchedCategories => {
              setCategories(fetchedCategories);
            });
          }}
        />

        {selectedCategory && (
          <EditCategoryModal
            isOpen={editModalIsOpen}
            onClose={closeEditModal}
            onEditCategory={closeEditModal}
            category={selectedCategory}
          />
        )}
        <DeleteConfirmationModal
          isOpen={deleteModalIsOpen}
          onClose={closeDeleteModal}
          onConfirm={deleteCategory}
          productName={selectedCategory?.name || ''}
        />

        <Box sx={{ width: '100%' }}>
          <CustomTable
            columns={columns}
            data={categories}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </Box>

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
