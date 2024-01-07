import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileOrders, setProfileFeedError, setProfileFeedLoading } from "../../services/profile-orders-slice";
import OrdersFeedZone from "../../components/orders-zone/orders-zone";
import { refreshAccessToken } from "../../services/auth-slice";
import ProfileColumn from "../../components/profile-column/profile-column";
import styles from './profile-feed-page.module.css';
import { connectWebSocket, disconnect } from '../../services/web-socket-slice';

const ProfileFeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await refreshAccessToken();
      const socketUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken.replace('Bearer ', '')}`;
      dispatch(connectWebSocket(socketUrl, 'profile'));
      return () => {
        dispatch(disconnect());
      };
    }
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
