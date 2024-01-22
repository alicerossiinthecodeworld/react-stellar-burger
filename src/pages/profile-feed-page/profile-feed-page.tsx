import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshAccessToken } from '../../services/auth-slice';
import { ProfileFeedWsClose } from '../../services/actions/profile-feed-actions';
import { connectWebSocket } from '../../utils/web-socket-utils';
import OrdersFeedZone from "../../components/orders-zone/orders-zone";
import ProfileColumn from "../../components/profile-column/profile-column";
import styles from './profile-feed-page.module.css';
import { RootState } from '../../services/store';
import React from 'react';

const ProfileFeedPage = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state:RootState) => state.profileOrders.profileOrders);
  console.log(orders)
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await refreshAccessToken();
      const socketUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken.replace('Bearer ', '')}`;
      dispatch(connectWebSocket(socketUrl));
      return () => {
        dispatch(ProfileFeedWsClose);
      };
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.columns}>
        <ProfileColumn additionalText={"В этом разделе вы можете просмотреть свою историю заказов"} />
        {orders && <OrdersFeedZone orders={orders} />}
      </div>
    </div>
  );
};

export default ProfileFeedPage;
