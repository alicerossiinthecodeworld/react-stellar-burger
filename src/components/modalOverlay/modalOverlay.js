import React from 'react';
import modalStyles from './modalOverlay.module.css';

const ModalOverlay = ({ onClose, children }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={modalStyles.modalOverlay} onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};

export default ModalOverlay;
