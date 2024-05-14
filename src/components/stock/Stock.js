import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Box, Card, Typography, Stack } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import StockModal from '@/components/modals/addUserModal';
import { useTheme } from '../../themeContext';

function StockList() {
  const [stocks, setStocks] = useState([]);
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
    const fetchStock = async () => {
      try {
        const response = await apiConfig.get('/stock');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stock', error);
      }
    };
    fetchStock();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addStock = async (stockItem) => {
    try {
      const response = await apiConfig.post('/stock', stockItem);
      setStocks(prevStocks => [...prevStocks, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error adding stock item', error);
    }
  };

  const deleteStock = async (stockId) => {
    try {
      await apiConfig.delete(`/stock/${stockId}`);
      setStocks(prevStocks => prevStocks.filter(stock => stock.id !== stockId));
      console.log('Stock item deleted successfully');
    } catch (error) {
      console.error('Error deleting stock item', error);
    }
  };

  const editStock = (stock) => {
    console.log('Editing stock:', stock);
  };

  const getRandomColor = () => {
    return `hsla(${Math.random() * 360}, 100%, 85%, 1)`;
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
        <Button variant="contained" onClick={openModal} sx={{ color: '#fff', bgcolor: '#1423DC', marginBottom: 2, marginTop: 2, borderRadius: '15px','&:hover': { bgcolor: '#96CD32'} }}>
          Ajouter un stock
        </Button>
        <StockModal isOpen={modalIsOpen} onClose={closeModal} onAddStock={addStock} />
        {stocks.map((stock, index) => (
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
            <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center' }}>{stock.name}</Typography>
            <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>{stock.category}</Typography>
            <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>Quantité: {stock.quantity}</Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button variant="outlined" onClick={() => editStock(stock)}>Modifier</Button>
              <Button variant="outlined" color="error" onClick={() => deleteStock(stock.id)}>Supprimer</Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default StockList;
