import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useTheme } from '@mui/material/styles';
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Snackbar, Alert } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import CustomButton from '../../components/buttons/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (formData: FormData) => void;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  categories: Category[];
}

interface FormData {
  product: Product;
  quantity: number;
}

const AddStockModal: React.FC<AddStockModalProps> = ({ isOpen, onClose, onAddStock }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({ product: { id: '', name: '', price: 0, categories: [] }, quantity: 0 });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);


  const theme = useTheme();

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseFloat(value) : value }));
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedProduct = products.find(product => product.id === selectedId);
    setSelectedProduct(selectedProduct || null);
    setFormData(prev => ({ ...prev, product: selectedProduct! }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDisabled(true);


    const newStock = {
      product: formData.product,
      quantity: formData.quantity,
    };

    console.log(newStock);

    try {
      const response = await apiConfig.post('/stock/', newStock, {});
      console.log('Réponse de l\'API:', response.data);
      onAddStock(newStock);
      setSnackbarOpen(true);
      onClose();
      setTimeout(() => {
        setIsDisabled(false);
      }, 10);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Erreur lors de l\'ajout du stock', error.response?.data);
      } else {
        console.error('Erreur lors de l\'ajout du stock', (error as Error).message);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <Typography variant="h6" className="modal-title">
            Ajouter un stock
          </Typography>
          <form onSubmit={handleSubmit} className="modal-form">
            <InputLabel id="product-select-label" className="modal-label">Produit</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              value={selectedProduct ? selectedProduct.id : ''}
              onChange={handleProductChange}
              input={<OutlinedInput label="Produit" />}
              renderValue={(selected) => {
                const product = products.find(prod => prod.id === selected);
                return product ? product.name : '';
              }}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
              ))}
            </Select>

            <InputLabel htmlFor="quantity" className="modal-label">Quantité</InputLabel>
            <CustomInput name="quantity" value={formData.quantity} onChange={handleChange} required type="number" />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CustomButton text="Ajouter" type="submit" disabled={isDisabled} />
            </Box>
          </form>
        </ModalContent>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Stock ajouté avec succès !
        </Alert>
      </Snackbar>
    </>
  );
};

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className?: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={open ? "base-Backdrop-open " + (className || "") : className || ""}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    & .modal-label {
      font-weight: 600;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    }
  `,
);

export default AddStockModal;

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
