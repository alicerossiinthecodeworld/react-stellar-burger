import React from 'react';
import orderStyles from './orderDetails.module.css'
import PropTypes from 'prop-types';

import { CheckMarkIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = ({ orderNumber, onClose }) => {
  return (
    <div className={orderStyles.orderWindow}>
      <p className={orderStyles.orderId}>{orderNumber}</p>
      <h2 className={orderStyles.orderHeader}>Идентификатор заказа</h2>
      <div className={orderStyles.orderIcon}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={orderStyles.orderText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.orderText}>Дождитесь готовности на орбитальной станции</p>
      <div className={orderStyles.orderClose}>
        <CloseIcon onClick={onClose} />
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default OrderDetails;
