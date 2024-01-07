import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

let socketInstance = null;

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
      state.feedType = action.payload
    },
    disconnect: (state) => {
      state.socketUrl = null;
      state.feedType = null;
    },
  },
});

export const { connect, disconnect, setFeedType } = websocketSlice.actions;

export const connectWebSocket = (socketUrl, feedType) => (dispatch) => {
  if (socketInstance !== null) {
    socketInstance.close();
  }
  console.log(`feed:${feedType}`)
  dispatch(setFeedType(feedType));
  socketInstance = new WebSocket(socketUrl);
  socketInstance.onopen = () => {
    dispatch({ type: "wsConnection", payload: { "url": socketUrl, "feed": feedType } });
  };
};



export default websocketSlice.reducer;
