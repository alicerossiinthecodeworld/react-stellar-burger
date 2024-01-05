import styles from './orders-zone.module.css'
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/data';
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const OrdersFeedZone = ({orders}) => {
  const getOrderPrice = (order) => {
    return order.ingredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find(ing => ing._id === ingredientId);
      return total + (ingredient ? Number(ingredient.price) : 0);
    }, 0);
  };

  const getIngredientImages = (order) => {
    const images = order.ingredients.map(ingredientId => {
      const ingredient = ingredients.find(ing => ing._id === ingredientId);
      return ingredient.image;
    });
    return images;
  };

  const ingredients = useSelector(state => state.ingredients.data.data);

  return (
    <div className={styles.ordersZone}>
    <div className={styles.ordersScrollbar}>
      {orders.map(order => (
       <Link to={`/feed/${order.number}`} key={order.number}  className={styles.navLink}>
        <div key={order.number} className={styles.orderBox}>
          <div className={styles.orderHeaderZone}>
            <p className={styles.orderId}>#{order.number}</p>
            <p className={styles.orderDate}>{formatDate(order.createdAt)}</p>
          </div>
          <p className={styles.name}>{order.name}</p>
          <div className={styles.priceZone}>
            <div className={styles.ingredientImages}>
              {getIngredientImages(order).
              slice(0, 8).
              map((imageSrc, index) => (
                <img className={styles.image} key={index} src={imageSrc} alt={`Ingredient ${index}`}
                  style={{
                    marginLeft: index === 0 ? '0' : '-20px',
                    zIndex: 1000 - index
                  }}  >
                </img>
              ))}
            </div>
            <div className={styles.orderPrice}>
              <p className={styles.priceDigits}>{getOrderPrice(order)}</p>
              <CurrencyIcon className={styles.currencyIcon} />
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  </div>
  )}

  export default OrdersFeedZone;
