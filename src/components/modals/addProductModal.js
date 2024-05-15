import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import apiConfig from '@/api/apiConfig';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

Modal.setAppElement("#root");

function ProductModal({ isOpen, onClose, onAddProduct }) {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        categories: []
    });

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

    const [hover, setHover] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleCategoryChange = (event) => {
        const selectedIds = event.target.value;
        const selectedCategories = selectedIds.map(id => {
            const category = categories.find(category => category.id === id);
            return {
                id: category.id,
                name: category.name
            };
        });
        setFormData(prev => ({
            ...prev,
            categories: selectedCategories
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddProduct(formData);
        onClose();
    };

    const buttonStyle = {
        padding: '10px',
        marginTop: '30px',
        borderRadius: '15px',
        border: 'none',
        backgroundColor: hover ? '#96CD32' : '#1423DC',
        color: 'white',
        cursor: 'pointer',
        width: '150px',
        fontSize: '20px'
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Ajouter un produit"
            style={{
                overlay: styles.modalStyle,
                content: {
                    ...styles.modalContentStyle,
                    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fefefe',
                    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873'
                }
            }}
        >
            <Typography variant="h6" style={{ ...styles.titleStyle, color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232876' }}>
                Ajouter un produit
            </Typography>
            <form onSubmit={handleSubmit} style={styles.formStyle}>
                <label style={{ ...styles.labelStyle, color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873' }}>
                    Nom du produit
                </label>
                <OutlinedInput
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.inputStyle}
                />
                <label style={{ ...styles.labelStyle, color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873' }}>
                    Prix du produit
                </label>
                <OutlinedInput
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={styles.inputStyle}
                />
                <Box sx={{ width: '100%', marginBottom: '10px' }}>
                    <InputLabel id="category-select-label" style={{ marginBottom: '5px', fontSize: '16px', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873' }}>
                        Catégories
                    </InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        multiple
                        value={formData.categories.map(category => category.id)}
                        onChange={handleCategoryChange}
                        input={<OutlinedInput label="Catégories" />}
                        renderValue={(selected) => selected.map(id => {
                            const category = categories.find(cat => cat.id === id);
                            return category ? category.name : '';
                        }).join(', ')}
                        style={styles.inputStyle}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    style={buttonStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Ajouter
                </Button>
            </form>
        </Modal>
    );
}

const styles = {
    modalStyle: {
        position: 'fixed',
        zIndex: 1,
        paddingTop: '100px',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '15px'
    },
    modalContentStyle: {
        position: 'relative',
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '20px',
        fontSize: '20px',
        width: '30%',
        color: '#232876',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)',
        animation: 'animatetop 0.4s'
    },
    titleStyle: {
        textAlign: 'center',
        marginTop: '10px'
    },
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    },
    inputStyle: {
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
        fontSize: '16px'
    },
    labelStyle: {
        alignSelf: 'flex-start',
        marginBottom: '5px',
        fontSize: '16px'
    }
};

export default ProductModal;
