import React from 'react';
import modalStyles from './modalOverlay.module.css';

const ModalOverlay = ({ children, ...props }) => {
  return (
    <div className={modalStyles.modalOverlay} {...props}>
      {children}
    </div>
  );
};

export default ModalOverlay;