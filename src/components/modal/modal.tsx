import { useEffect, useCallback, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalstyles from './modal.module.css';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }:ModalProps) => {
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
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
      <ModalOverlay>
        <div className={modalstyles.modalContent} onClick={handleModalClick}>
          {children}
          <div className={modalstyles.close}>
            <CloseIcon type='primary' onClick={onClose}/>
          </div>
        </div>
      </ModalOverlay>
    </div >,
    document.getElementById('modals')!
  );
};

export default Modal;
