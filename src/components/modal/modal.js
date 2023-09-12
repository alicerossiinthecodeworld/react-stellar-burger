import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalstyles from './modal.module.css';

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
      <ModalOverlay>{children}
      <div className={modalstyles.close}>
        <CloseIcon onClick={onClose} />
      </div></ModalOverlay>
    </div>,
    document.getElementById('modals')
  );
};

export default Modal;
