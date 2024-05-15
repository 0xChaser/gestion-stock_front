import React from 'react';
import Modal from 'react-modal';
import { Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

Modal.setAppElement("#root");

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }) {
    const theme = useTheme();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmer la suppression"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fefefe',
                    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#232873',
                    borderRadius: '10px',
                    padding: '20px',
                    width: '400px',
                    textAlign: 'center'
                }
            }}
        >
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
                Êtes-vous sûr de vouloir supprimer {productName} ?
            </Typography>
            <Box display="flex" justifyContent="space-around">
                <Button variant="contained" color="error" onClick={onConfirm}>
                    Oui
                </Button>
                <Button variant="contained" onClick={onClose}>
                    Non
                </Button>
            </Box>
        </Modal>
    );
}

export default DeleteConfirmationModal;
