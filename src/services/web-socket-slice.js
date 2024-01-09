import { createSlice } from '@reduxjs/toolkit';
import { WebSocketConnection } from './actions/actions';
import { setProfileOrders } from './profile-orders-slice';
import { setOrders, setTotal, setTotalToday } from './orders-slice';
const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    socketUrl: null,
    feedType: null,
  },
  reducers: {
    connect: (state, action) => {
      state.socketUrl = action.payload.url;
    },
    setFeedType: (state, action) => {
      state.feedType = action.payload;
    },
    disconnect: (state) => {
      state.socketUrl = null;
      state.feedType = null;
    },
    wsMessage: (state, action) =>
    { const parsedData = action.payload
      if (state.feed === 'profile') {
      if (parsedData && parsedData.orders && parsedData.orders.length > 0) {
        dispatch(setProfileOrders(parsedData.orders));
      }
    } else {
      if (parsedData && parsedData.orders && parsedData.orders.length > 0) {
        dispatch(setOrders(parsedData.orders));
        dispatch(setTotal(parsedData.total));
        dispatch(setTotalToday(parsedData.totalToday));
      }
    }}
  },
})
  
export const { connect, disconnect, setFeedType, wsMessage} = websocketSlice.actions;
let socketInstance = null;


export const connectWebSocket = (socketUrl, feedType) => {
  return (dispatch) => {

    if (socketInstance !== null) {
      socketInstance.close();
    }
    dispatch(setFeedType(feedType));
    socketInstance = new WebSocket(socketUrl);

    socketInstance.onopen = () => {
      dispatch({ type: WebSocketConnection, payload: { url: socketUrl, feed: feedType } });
    };
  };
};

export default websocketSlice.reducer;
