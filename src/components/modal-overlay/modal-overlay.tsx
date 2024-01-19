import { ReactNode } from 'react';
import modalStyles from './modal-overlay.module.css';

const ModalOverlay = ({ children, ...props }:{children: ReactNode;}) => {
  return (
    <div className={modalStyles.modalOverlay} {...props}>
      <div className={modalStyles.modalWindow}>
      {children}
      </div>
    </div>
  );
};

export default ModalOverlay;