import styles from './orders-zone.module.css'
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/data';
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Ingredient } from '../burger-ingredients/burger-ingredients';
import { RootState } from '../../services/store';

export enum OrderStatus {
    Done = 'done',
    Pending = 'pending',
    Сancelled = 'cancelled'
}

export type Order = {
    "_id": string,
    "ingredients": string [],
    "status": OrderStatus,
    "name": string,
    "createdAt": string,
    "updatedAt": string,
    "number": number
}

const OrdersFeedZone = ({ orders }: { orders: Order[] }) => {
  const ingredients = useSelector((state: RootState) => state.ingredients?.data);
  const getOrderPrice = (order: Order) => {
    return order.ingredients.reduce((total: number, ingredientId: string) => {
      const ingredient = ingredients?.find((ing: Ingredient) => ing._id === ingredientId);
      return total + (ingredient ? Number(ingredient.price) : 0);
    }, 0);
  };
  
  const getIngredientImages = (order: Order) => {
    const images = order.ingredients.map((ingredientId: string) => {
      const ingredient = ingredients?.find((ing: Ingredient) => ing._id === ingredientId);
      if (ingredient && ingredient.image !== undefined) {
        return ingredient.image;
      }
      return ''; 
    });
    return images;
  };

  return (
    <div className={styles.ordersZone}>
      <div className={styles.ordersScrollbar}>
        {orders.map((order: Order) => (
          <Link to={`/feed/${order.number}`} key={order.number} className={styles.navLink}>
            <div key={order.number} className={styles.orderBox}>
              <div className={styles.orderHeaderZone}>
                <p className={styles.orderId}>#{order.number}</p>
                <p className={styles.orderDate}>{formatDate(order.createdAt)}</p>
              </div>
              <p className={styles.name}>{order.name}</p>
              <div className={styles.priceZone}>
                <div className={styles.ingredientImages}>
                  {getIngredientImages(order)
                    .slice(0, 8)
                    .map((imageSrc: string, index: number) => (
                      <img
                        className={styles.image}
                        key={index}
                        src={imageSrc}
                        alt={`Ingredient ${index}`}
                        style={{
                          marginLeft: index === 0 ? '0' : '-20px',
                          zIndex: 1000 - index
                        }}
                      />
                    ))}
                </div>
                <div className={styles.orderPrice}>
                  <p className={styles.priceDigits}>{getOrderPrice(order)}</p>
                  <div className={styles.currencyIcon}><CurrencyIcon type='primary'/></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OrdersFeedZone;
