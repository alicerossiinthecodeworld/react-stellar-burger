import { refreshAccessToken } from "./auth-slice";
import { FeedWsClose, FeedWsConnect, FeedWsConnecting, FeedWsDisconnect, FeedWsError, FeedWsMessage, FeedWsOpen, WebSocketConnection } from "./actions/feed-actions";
import { ProfileFeedWsClose, ProfileFeedWsConnect, ProfileFeedWsConnecting, ProfileFeedWsDisconnect, ProfileFeedWsError, ProfileFeedWsMessage, ProfileFeedWsMessagePayload, ProfileFeedWsOpen } from "./actions/profile-feed-actions";
import { AnyAction } from "redux";
import { Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "./store";


export type WsActionsType = {
  wsConnect: typeof FeedWsConnect|typeof ProfileFeedWsConnect;
  wsDisconnect: typeof FeedWsDisconnect|typeof ProfileFeedWsDisconnect;
  wsConnecting: typeof FeedWsConnecting|typeof ProfileFeedWsConnecting;
  onOpen: typeof FeedWsOpen| typeof ProfileFeedWsOpen
  onClose: typeof FeedWsClose| typeof ProfileFeedWsClose
  onError: typeof FeedWsError| typeof ProfileFeedWsError
  onMessage: typeof FeedWsMessage| typeof ProfileFeedWsMessage
};

export const socketMiddleware = (wsActions: WsActionsType): Middleware<{}, RootState, Dispatch<AnyAction>> => {
  const { onClose, onMessage, wsConnect } = wsActions;
  return (api: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => 
    (next: (action: unknown) => unknown) => 
    (action: AnyAction|unknown) => {
      if (typeof action === 'object' && action !== null && 'type' in action) {
        const typedAction = action as AnyAction; 

        if (typedAction.type === WebSocketConnection) {
          if (typedAction.payload?.url) {
            const socketInstance = new WebSocket(typedAction.payload.url);
            socketInstance.onopen = () => {
              api.dispatch(wsConnect(typedAction.payload.url));
            };
            socketInstance.onerror = (error) => {
              console.error(error);
            };

            socketInstance.onmessage = (event) => {
              const { data } = event;
              const parsedData = JSON.parse(data);
              if (parsedData?.message === 'Invalid or missing token') {
                refreshAccessToken();
              }
              api.dispatch(onMessage(parsedData));
            };

            socketInstance.onclose = () => {
              api.dispatch(onClose());
            };
          }
        }
        return next(typedAction);
      }
      return next(action as AnyAction);
    };
};

