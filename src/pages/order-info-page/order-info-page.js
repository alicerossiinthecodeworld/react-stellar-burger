import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchOrderById } from '../../services/orders-slice';
import { formatDate } from '../../utils/data';
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info-page.module.css'

export const OrderInfoPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ingredients = useSelector(state => state.ingredients.data.data);

  useEffect(() => {
    setLoading(true);
    const foundOrder = orders && orders.find((order) => order.number === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
      setLoading(false);
    } else {
      let isMounted = true;

      dispatch(fetchOrderById(orderId))
        .then((response) => {
          if (isMounted) {
            setOrder(response);
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [orderId, orders, dispatch]);

  const getOrderPrice = (order) => {
    if (!order || !order.ingredients || !ingredients || !ingredients.length) {
      return 0;
    }
  
    return order.ingredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find((ing) => ing._id === ingredientId);
      return total + (ingredient ? Number(ingredient.price) : 0);
    }, 0);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {order ? (
        <>
          <div className={styles.orderNumber}>#{order.number}</div>
          <div className={styles.orderName}>{order.name}</div>
          <div className={styles.orderStatus}>{order.status == "done" ? "Выполнен" : "В работе"}</div>
          <p className={styles.containsHeader}>Cостав</p>
          <div className={styles.contains}>
            {order && ingredients && (
              Array.from(new Set(order.ingredients)).map((ingredientId) => {
                const ingredient = ingredients.find((ing) => ing._id === ingredientId);
                const count = order.ingredients.filter((id) => id === ingredientId).length;
                if (ingredient) {
                  return (
                    <div className={styles.containsItem} key={ingredient._id}>
                      <img className={styles.containsImg} src={ingredient.image} alt={ingredient.name} />
                      <span className={styles.containsTitle}>{ingredient.name}</span>
                      <span className={styles.containsPrice}>
                        {`${count} x ${ingredient.price}`}
                        <CurrencyIcon className={styles.currencyIcon} />
                      </span>
                    </div>
                  );
                }
                return null;
              })
            )}
            <div className={styles.orderTotal}>
              <p className={styles.orderTime}>{formatDate(order.createdAt)}</p>
              <span className={styles.containsPrice}>
                {getOrderPrice(order)}
                <CurrencyIcon className={styles.currencyIcon} />
              </span>
            </div>
          </div>;
        </>
      ) : (
        <div>Не нашел заказ</div>
      )}
    </div>
  );
};

export default OrderInfoPage;
