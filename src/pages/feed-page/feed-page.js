import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setError, setLoading, setTotal, setTotalToday } from '../../services/orders-slice';
import styles from './feed-page.module.css';

import OrdersFeedZone from '../../components/orders-zone/orders-zone';

function FeedPage() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.data);
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
      socket.close();
    };
  }, []);

  if (orders.length === 0) {
    return <div className = {styles.notFound}>
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
      <OrdersFeedZone orders={orders}/>
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