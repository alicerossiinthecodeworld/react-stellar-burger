import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchOrderById, setOrder } from '../../services/order-details-slice';
import { formatDate } from '../../utils/data';
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info-page.module.css'
import { RootState } from '../../services/store';
import { Order } from '../../components/orders-zone/orders-zone';
import { Ingredient } from '../../components/burger-ingredients/burger-ingredients';

export const OrderInfoPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const order = useSelector((state: RootState) => state.orderDetails.order);
  const [loading, setLoading] = useState(false);
  const ingredients = useSelector((state: RootState) => state.ingredients.data);
  console.log("заказ на страничке",order)
  useEffect(() => {
    const fetchOrder = async () => {
        setLoading(true);
        const foundOrder = orders?.find((o: Order) => o.number === Number(orderId));
        if (foundOrder) {
          setOrder(foundOrder);
          setLoading(false);
        } else {
          dispatch(fetchOrderById(Number(orderId)))
          setLoading(false);
        }
    };
    fetchOrder();
  }, [orderId, orders, dispatch]);


  const getOrderPrice = (order: Order) => {
    return order?.ingredients?.reduce((total, ingredientId) => {
      const ingredient = ingredients?.find((ing: Ingredient) => ing._id === ingredientId);
      return total + (ingredient?.price ?? 0) * (order.ingredients.filter(id => id === ingredientId).length);
    }, 0) ?? 0;
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {order ? (
        <>
          <div className={styles.orderNumber}>#{order.number}</div>
          <div className={styles.orderName}>{order.name}</div>
          <div className={styles.orderStatus}>{order.status === "done" ? "Выполнен" : "В работе"}</div>
          <p className={styles.containsHeader}>Cостав</p>
          <div className={styles.contains}>
            {order && ingredients && (
              Array.from(new Set(order.ingredients)).map((ingredientId) => {
                const ingredient = ingredients.find((ing: Ingredient) => ing._id === ingredientId);
                const count = order.ingredients.filter((id: string) => id === ingredientId).length;
                if (ingredient) {
                  return (
                    <div className={styles.containsItem} key={ingredient._id}>
                      <img className={styles.containsImg} src={ingredient.image} alt={ingredient.name} />
                      <span className={styles.containsTitle}>{ingredient.name}</span>
                      <span className={styles.containsPrice}>
                        {`${count} x ${ingredient.price}`}
                        <div className={styles.currencyIcon}>
                          <CurrencyIcon type='primary' />
                        </div>
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
                <div className={styles.currencyIcon}>
                  <CurrencyIcon type='primary' />
                </div>
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




