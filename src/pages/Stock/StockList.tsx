import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Grid, Typography, styled, Card, CardContent } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import AddStockModal from '../Modals/addStockModal';
import EditStockModal from '../Modals/editStockModal';
import DeleteConfirmationModal from '../Modals/DeleteModal';
import CustomSnackbar from '../../components/snackbar/CustomSnackbar';
import { useTheme } from '../../contexts/themeContext';
import CustomButton from '../../components/buttons/CustomButton';
import CustomDeleteButton from '../../components/buttons/CustomDeleteButton';
import CustomEditButton from '../../components/buttons/CustomEditButton';
import CustomTitle from '../../components/titles/CustomTitle';
import ToggleViewButton from '../../components/buttons/ToggleViewButton';
import CustomTable from '../../components/tables/CustomTable';
import SuperuserGuard from '../../guards/SuperuserGuard';

interface Stock {
  id: string;
  product: {
    name: string;
    price: number;
    categories: { name: string; id: string; }[];
    id: string;
  };
  quantity: number;
}

interface FormData {
  product: {
    id: string;
    name: string;
    price: number;
    categories: { name: string; id: string; }[];
  };
  quantity: number;
}


const fetchStocks = async (): Promise<Stock[]> => {
  try {
    const response = await apiConfig.get('/stock/');
    const sortedStocks = response.data.sort((a: Stock, b: Stock) => a.product.name.localeCompare(b.product.name));
    return sortedStocks;
  } catch (error) {
    console.error('Problème de récupération', error);
    throw error;
  }
};

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
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
    const getStocks = async () => {
      try {
        const fetchedStocks = await fetchStocks();
        setStocks(fetchedStocks);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    };
    getStocks();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = async () => {
    setModalIsOpen(false);
    await fetchStocks().then(fetchedStocks => {
      setStocks(fetchedStocks);
    });
  };

  const openEditModal = (stock: Stock) => {
    setSelectedStock(stock);
    setEditModalIsOpen(true);
  };
  const closeEditModal = async () => {
    setSelectedStock(null);
    setEditModalIsOpen(false);
    await fetchStocks().then(fetchedStocks => {
      setStocks(fetchedStocks);
    });
  };

  const openDeleteModal = (stock: Stock) => {
    setSelectedStock(stock);
    setDeleteModalIsOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedStock(null);
    setDeleteModalIsOpen(false);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const addStock = async (formData: FormData) => {
    try {
      const response = await apiConfig.post('/stock/', formData);
      fetchStocks();
      setSnackbarMessage('Stock ajouté avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du stock', error);
    }
  };

  const editStock = async (id: string, formData: { quantity: number }) => {
    try {
      const response = await apiConfig.patch(`/stock/${id}`, formData);
      fetchStocks();
      setSnackbarMessage('Stock modifié avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la modification du stock', error);
    }
  };

  const deleteStock = async () => {
    if (selectedStock === null) return;
    try {
      await apiConfig.delete(`/stock/${selectedStock.id}`);
      await fetchStocks().then(fetchedStocks => {
        setStocks(fetchedStocks);
      });
      closeDeleteModal();
      setSnackbarMessage('Stock supprimé avec succès !');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erreur lors de la suppression du stock', error);
    }
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const columns = [
    { id: 'product.name', label: 'Nom du Produit' },
    { id: 'quantity', label: 'Quantité', align: 'right' },
    { id: 'product.price', label: 'Prix (en €)', align: 'right' },
    { id: 'product.categories', label: 'Catégories', align: 'right', format: (value: any) => Array.isArray(value) ? value.map((category: any) => category.name).join(', ') : 'Pas de catégorie' }
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
        <CustomTitle>Liste du Stock</CustomTitle>
        <SuperuserGuard>

          <CustomButton text="Ajouter des Stocks" onClick={openModal} disabled={false} />

        </SuperuserGuard>

        <ToggleViewButton view={view} handleChange={handleViewChange} />

        <AddStockModal isOpen={modalIsOpen} onClose={closeModal} onAddStock={async () => {
          await fetchStocks().then(fetchedStocks => {
            setStocks(fetchedStocks);
          });
        }} />
        {selectedStock && (
          <EditStockModal
            isOpen={editModalIsOpen}
            onClose={closeEditModal}
            onEditStock={async () => {
              closeEditModal();
              await fetchStocks().then(fetchedStocks => {
                setStocks(fetchedStocks);
              });
            }}
            stock={selectedStock}
          />
        )}
        <DeleteConfirmationModal
          isOpen={deleteModalIsOpen}
          onClose={closeDeleteModal}
          onConfirm={deleteStock}
          productName={selectedStock?.product.name || ''}
        />

        {view === 'module' ? (
          <Grid container spacing={3}>
            {stocks.map((stock) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={stock.id}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" component="div">
                        {stock.product.name}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {stock.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Catégorie(s): {Array.isArray(stock.product.categories) ? stock.product.categories.map(cat => cat.name).join(', ') : 'Pas de catégorie'}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Prix: {stock.product.price} €
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 3 }}>
                      <CustomEditButton text="Modifier" onClick={() => openEditModal(stock)} disabled={false} />
                      <CustomDeleteButton text="Supprimer" onClick={() => openDeleteModal(stock)} disabled={false} />
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
              data={stocks.map(stock => ({
                ...stock,
                'product.name': stock.product.name,
                'product.price': stock.product.price,
                'product.categories': Array.isArray(stock.product.categories) ? stock.product.categories.map(cat => cat.name).join(', ') : 'Pas de catégorie',
              }))}
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

export default StockList;
