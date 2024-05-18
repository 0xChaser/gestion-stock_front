import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from 'react-modal';

Modal.setAppElement("#root");

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (formData: { username: string; isAdmin: boolean }) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({ username: '', isAdmin: false });
  const [hover, setHover] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddUser(formData);
    onClose();
  };

  const buttonStyle: React.CSSProperties = {
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
      contentLabel="Ajouter un utilisateur"
      style={{
        overlay: styles.modalStyle as React.CSSProperties,
        content: styles.modalContentStyle as React.CSSProperties,
      }}
    >
      <h1>Ajouter une catégorie</h1>
      <form onSubmit={handleSubmit} style={styles.formStyle as React.CSSProperties}>
        <label>Nom de la catégorie</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Ajouter
        </button>
      </form>
    </Modal>
  );
};

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
    width: '20%',
    color: '#232873',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)',
    animation: 'animatetop 0.4s'
  },
  titleStyle: {
    textAlign: 'center',
    color: '#232876',
    marginTop: '10px'
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  }
};

export default UserModal;
