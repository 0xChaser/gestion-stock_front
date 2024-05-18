import React from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stockItem: { name: string; category: string; quantity: number; price: number }) => void;
}

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose, onAddStock }) => {
  const [name, setName] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);

  const handleAddStock = () => {
    onAddStock({ name, category, quantity, price });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter un stock
        </Typography>
        <TextField
          fullWidth
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Quantité"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Prix"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddStock}>
          Ajouter
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStockModal;
