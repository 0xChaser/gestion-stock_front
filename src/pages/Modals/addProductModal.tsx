import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useTheme } from '@mui/material/styles';
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Snackbar, Alert } from '@mui/material';
import apiConfig from '../../api/apiConfig';
import CustomButton from '../../components/buttons/CustomButton';
import CustomInput from '../../components/inputs/CustomInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios' ;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (formData: FormData) => void;
}

interface Category {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  price: number;
  categories: Category[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({ name: '', price: 0, categories: [] });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiConfig.get('/category/');
        setCategories(response.data);
      } catch (error) {
        console.error('Problème de récupération', error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    const selectedCategories = selectedIds.map(id => {
      const category = categories.find(category => category.id === id);
      return { id: category!.id, name: category!.name };
    });
    setFormData(prev => ({ ...prev, categories: selectedCategories }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct = {
      name: formData.name,
      price: formData.price,
      categories: formData.categories.map(category => ({
        id: category.id,
        name: category.name,
      })),
    };

    console.log(newProduct);

    try {
      const response = await apiConfig.post('/product/', newProduct, {
      });
      console.log('Réponse de l\'API:', response.data);
      onAddProduct(newProduct);
      setSnackbarOpen(true);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {  
        console.error('Erreur lors de l\'ajout du produit', error.response?.data);
      } else {
        console.error('Erreur lors de l\'ajout du produit', (error as Error).message);
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
            Ajouter un produit
          </Typography>
          <form onSubmit={handleSubmit} className="modal-form">
            <InputLabel htmlFor="name" className="modal-label">Nom du produit</InputLabel>
            <CustomInput name="name" value={formData.name} onChange={handleChange} required />

            <InputLabel htmlFor="price" className="modal-label">Prix du produit</InputLabel>
            <CustomInput name="price" value={formData.price} onChange={handleChange} required type="number" />

            <InputLabel id="category-select-label" className="modal-label">Catégories</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              multiple
              value={formData.categories.map(category => category.id)}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Catégories" />}
              renderValue={(selected) => (selected as string[]).map(id => {
                const category = categories.find(cat => cat.id === id);
                return category ? category.name : '';
              }).join(', ')}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CustomButton text="Ajouter" type="submit" disabled={false} />
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
          Produit ajouté avec succès !
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

export default AddProductModal;

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
