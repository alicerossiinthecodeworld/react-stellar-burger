import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileOrders, setProfileFeedError, setProfileFeedLoading } from "../../services/profile-orders-slice";
import OrdersFeedZone from "../../components/orders-zone/orders-zone";
import { refreshAccessToken } from "../../services/auth-slice";
import ProfileColumn from "../../components/profile-column/profile-column";
import styles from './profile-feed-page.module.css';

const ProfileFeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await refreshAccessToken();
        const socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken.replace('Bearer ', '')}`);

        socket.onopen = () => {
          dispatch(setProfileFeedLoading(true));
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data && data.orders && data.orders.length > 0) {
            dispatch(setProfileOrders(data.orders));
          }
        };

        socket.onerror = (error) => {
          dispatch(setProfileFeedError(error.message));
        };

        socket.onclose = () => {
          dispatch(setProfileFeedLoading(false));
          socket.close();
        };
      } catch (error) {
        dispatch(setProfileFeedError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const orders = useSelector((state) => state.profileOrders.data);

  return (
    <div className={styles.page}>
      <div className={styles.columns}>
        <ProfileColumn additionalText={"В этом разделе вы можете просмотреть свою историю заказов"} />
        <OrdersFeedZone orders={orders} />
      </div>
    </div>
  );
};

export default ProfileFeedPage;
