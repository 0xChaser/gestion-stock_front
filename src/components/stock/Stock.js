import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import apiConfig from '@/api/apiConfig';
import StockModal from '@/components/modals/addUserModal'; // Ensure this modal is created for adding stock items
import { useTheme } from '../../themeContext';

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

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
      }}>
        <h1 style={{ color: darkMode ? '#96CD32' : '#232876', textAlign: 'center', fontSize: '2.5rem', marginTop: '1.8%', textDecoration: 'underline'}}>
          Vue du Stock
        </h1>
        <StockModal isOpen={modalIsOpen} onClose={closeModal} onAddStock={addStock} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>Produit</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>Categorie</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>Quantité</TableCell>
              <TableCell sx={{ backgroundColor: '#232876', color: 'white', textAlign: 'center', padding: 2, fontSize: '1.25rem', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{stock.name}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{stock.category}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>{stock.quantity}</TableCell>
                <TableCell sx={{ border: 1, borderColor: 'grey.300', textAlign: 'center', padding: 2 }}>
                  <Button color="primary">Modifier</Button>
                  <Button color="error">Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default StockList;
