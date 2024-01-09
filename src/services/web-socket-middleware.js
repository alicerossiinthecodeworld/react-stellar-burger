import { connect, disconnect, wsMessage } from "./web-socket-slice";
import { WebSocketConnection } from './actions/actions'
import { refreshAccessToken } from "./auth-slice";

export const socketMiddleware = () => {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type === WebSocketConnection) {
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
        if (data?.message === 'Invalid or missing token') { refreshAccessToken() }
        dispatch(wsMessage(parsedData))
      };

      socketInstance.onclose = () => {
        dispatch(disconnect());
      };
    }
    return next(action);
  };
};