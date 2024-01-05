import { createSlice } from '@reduxjs/toolkit';

let socketInstance = null;

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    socketUrl: null,
    eventHandlers: {
      onOpen: null,
      onMessage: null,
      onError: null,
    },
  },
  reducers: {
    connect: (state, action) => {
      state.socketUrl = action.payload.url;
      state.eventHandlers = { ...action.payload.eventHandlers };
    },
    disconnect: (state) => {
      state.socketUrl = null;
      state.eventHandlers = {
        onOpen: null,
        onMessage: null,
        onError: null,
      };
    },
  },
});

export const { connect, disconnect } = websocketSlice.actions;


export const connectWebSocket = (socketUrl, onOpen, onMessage, onError) => async (dispatch) => {
  if (socketInstance !== null) {
    socketInstance.close();
  }

  socketInstance = new WebSocket(socketUrl);

  if (onOpen) {
    socketInstance.onopen = onOpen;
  }

  if (onMessage) {
    socketInstance.onmessage = onMessage;
  }

  if (onError) {
    socketInstance.onerror = onError;
  }

  socketInstance.onclose = () => {
    socketInstance = null;
    dispatch(disconnect());
  };
};


export default websocketSlice.reducer;
