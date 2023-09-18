import orderStyles from './order-details.module.css'
import PropTypes from 'prop-types';

import { CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = ({ orderNumber}) => {
  return (
    <div className={orderStyles.orderWindow}>
      <p className={orderStyles.orderId}>{orderNumber}</p>
      <h2 className={orderStyles.orderHeader}>Идентификатор заказа</h2>
      <div className={orderStyles.orderIcon}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={orderStyles.orderText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.orderText}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default OrderDetails;
