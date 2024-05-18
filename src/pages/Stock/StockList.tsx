import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Typography, Stack, Card, CardContent, IconButton, CardActions } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import AddStockModal from '../Modals/addStockModal';
import { useTheme } from '../../contexts/themeContext';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import CustomButton from '@/components/buttons/CustomButton';

interface StockItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<StockItem[]>([]);
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
    async function fetchStocks() {
      try {
        const response = await apiConfig.get('/stock');
        setStocks(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchStocks();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addStock = async (stockItem: Omit<StockItem, 'id'>) => {
    try {
      const response = await apiConfig.post('/stock', stockItem);
      setStocks(prevStocks => [...prevStocks, response.data]);
      closeModal();
      console.log('Stock ajouté avec succès', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du stock', error);
      throw error;
    }
  };

  const deleteStock = async (stockId: number) => {
    try {
      await apiConfig.delete(`/stock/${stockId}`);
      setStocks(prevStocks => prevStocks.filter(stock => stock.id !== stockId));
      console.log('Stock supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du stock', error);
    }
  };

  const editStock = (stock: StockItem) => {
    console.log('Modifier le stock:', stock);
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
          Vue du Stock
        </Typography>
        <CustomButton text="Ajouter un Stock" onClick={openModal} disabled={false} />

        <AddStockModal isOpen={modalIsOpen} onClose={closeModal} onAddStock={addStock} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {stocks.map((stock) => (
            <Card key={stock.id} sx={{ width: 320, padding: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {stock.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stock.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantité: {stock.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Prix: {stock.price}€
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => editStock(stock)}>Modifier</Button>
                <Button size="small" color="error" onClick={() => deleteStock(stock.id)}>Supprimer</Button>
              </CardActions>
              <IconButton
                aria-label="bookmark"
                color="default"
                sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
              >
                <BookmarkAdd />
              </IconButton>
            </Card>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StockList;
