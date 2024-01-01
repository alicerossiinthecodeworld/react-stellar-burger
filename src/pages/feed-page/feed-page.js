import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setError, setLoading, setTotal, setTotalToday } from '../../services/orders-slice';
import styles from './feed-page.module.css';
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function FeedPage() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.data);
  const ingredients = useSelector(state => state.ingredients.data.data);
  const total = useSelector(state => state.orders.total);
  const totalToday = useSelector(state => state.orders.totalToday);


  useEffect(() => {
    const socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');

    socket.onopen = () => {
      dispatch(setLoading(true));
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.orders.length > 0) {
        dispatch(setOrders(data.orders));
      }
      dispatch(setTotal(data.total))
      dispatch(setTotalToday(data.totalToday))
    };

    socket.onerror = error => {
      dispatch(setError(error.message));
    };

    socket.onclose = () => {
      dispatch(setLoading(false));
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

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
    console.log(images)
    return images;
  };

  if (orders.length === 0) {
    return <div>
      <h1>Лента заказов</h1>
      <p>Заказы отсутствуют</p>
    </div>;
  }

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const getOrdersByStatus = (status) => {
    return chunkArray(orders.filter(order => order.status === status), 10);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const options = { hour: '2-digit', minute: '2-digit' };
    const timeString = date.toLocaleTimeString('ru-RU', options);

    if (date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()) {
      return `Сегодня, ${timeString}  i-GMT+3`;
    }
    else {
      const dateOptions = { day: 'numeric', month: 'long' };
      const dateStringFormatted = date.toLocaleDateString('ru-RU', dateOptions);
      return `${dateStringFormatted}, ${timeString}  i-GMT+3`;
    }
  }

  const renderColumns = (ordersChunks) => {
    return ordersChunks.map((ordersChunk, index) => (
      <div key={index} className={styles.column}>
        {ordersChunk.map(order => (
          <div className = {styles.orderNumber} key={order._id}>{order.number}</div>
        ))}
      </div>
    ));
  };

  const readyOrders = getOrdersByStatus('done');
  const inProgressOrders = getOrdersByStatus('pending');

  return (
    <div className={styles.page}>
      <div className={styles.ordersZone}>
        <h1 className={styles.header}>Лента заказов</h1>
        <div className={styles.ordersScrollbar}>
          {orders.map(order => (
            <div key={order._id} className={styles.orderBox}>
              <div className={styles.orderHeaderZone}>
                <p className={styles.orderId}>#{order.number}</p>
                <p className={styles.orderDate}>{formatDate(order.createdAt)}</p>
              </div>
              <p className={styles.name}>{order.name}</p>
              <div className={styles.priceZone}>
                <div className={styles.ingredientImages}>
                  {getIngredientImages(order).map((imageSrc, index) => (
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
          ))}
        </div>
      </div>
      <div className={styles.infoZone}>
        <div className={styles.columnRow}>
          {readyOrders.length > 0 ? (
          <div className={styles.orderStatus}>
            <p className={styles.columnHeader}>Готовы</p>
            <div className={styles.columnRow}>
              {renderColumns(readyOrders)}
            </div>
          </div>):<div></div>}
          {inProgressOrders.length > 0 ? (
          <div className={styles.orderStatus}>
            <p className={styles.columnHeader}>В работе</p>
            <div className={styles.columnRow}>
              {renderColumns(inProgressOrders)}
            </div>
          </div>):<div></div>}
        </div>
        <div className={styles.total}>
          <p className={styles.columnHeader}>Выполнено за все время</p>
          <p className={styles.totalDigit}>{total}</p>
        </div>
        <div className={styles.total}>
          <p className={styles.columnHeader}>Выполнено за сегодня</p>
          <p className={styles.totalDigit}>{totalToday}</p>
        </div>
      </div >
    </div >
  );
}

export default FeedPage;
