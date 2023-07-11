import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';

const Modal = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleOverlayClick, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal" onClick={handleOverlayClick}>
      <ModalOverlay>{children}</ModalOverlay>
    </div>,
    document.getElementById('root')
  );
};

export default Modal;
