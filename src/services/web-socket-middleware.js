import { connect, disconnect } from "./web-socket-slice";
import { setTotal, setOrders, setTotalToday } from "./orders-slice";
import { setProfileOrders } from './profile-orders-slice'



export const socketMiddleware = () => {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type === "wsConnection") {
      const url = action.payload.url;
      const socketInstance = new WebSocket(url);

      socketInstance.onopen = () => {
        dispatch(connect({ url }));
      };

      socketInstance.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socketInstance.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        if (action.payload.feed === 'profile') {
          if (parsedData && parsedData.orders && parsedData.orders.length > 0) {
            dispatch(setProfileOrders(parsedData.orders));
          }
        } else {
          if (parsedData && parsedData.orders && parsedData.orders.length > 0) {
            dispatch(setOrders(parsedData.orders));
            dispatch(setTotal(parsedData.total));
            dispatch(setTotalToday(parsedData.totalToday));
          }
        }
      };

      socketInstance.onclose = () => {
        dispatch(disconnect());
      };
    }
    return next(action);
  };
};

