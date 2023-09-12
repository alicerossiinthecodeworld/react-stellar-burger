import React from 'react';
import modalStyles from './modalOverlay.module.css';

const ModalOverlay = ({ children, ...props }) => {
  return (
    <div className={modalStyles.modalOverlay} {...props}>
      <div className={modalStyles.modalWindow}>
      {children}
      </div>
    </div>
  );
};

export default ModalOverlay;