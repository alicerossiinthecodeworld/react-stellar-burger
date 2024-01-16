import { refreshAccessToken } from "./auth-slice";
import { WebSocketConnection } from "./actions/feed-actions";
export const socketMiddleware = ( {wsActions}) => {
  const {
    wsConnect,
    onClose,
    onError,
    onMessage,
  } = wsActions;
  return ({ dispatch }) => (next) => (action) => {
    if (action.type === WebSocketConnection) {
      const socketInstance = new WebSocket(action.payload.url);

      socketInstance.onopen = () => {
        dispatch(wsConnect(action.payload.url));
      };

      socketInstance.onerror = (error) => {
        dispatch(onError(error))
      };

      socketInstance.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        if (data?.message === 'Invalid or missing token') { refreshAccessToken() }
        dispatch(onMessage(parsedData))
      };

      socketInstance.onclose = () => {
        dispatch(onClose());
      };
    }
    return next(action);
  };
};