import { FeedWsConnect, FeedWsError, FeedWsDisconnect, FeedWsMessage, FeedWsConnecting, FeedWsOpen, FeedWsClose } 
from "../services/actions/feed-actions"
import { ProfileFeedWsClose, ProfileFeedWsConnect, ProfileFeedWsDisconnect, ProfileFeedWsOpen, ProfileFeedWsConnecting, ProfileFeedWsError, ProfileFeedWsMessage} from "../services/actions/profile-feed-actions"
import { WebSocketConnection } from "../services/actions/feed-actions"

export const WebsocketStatus  = {
  CONNECTING:  'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const wsFeedActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
}

export const wsProfileActions = {
  wsConnect:ProfileFeedWsConnect,
  wsDisconnect: ProfileFeedWsDisconnect,
  wsConnecting: ProfileFeedWsConnecting,
  onOpen: ProfileFeedWsOpen,
  onClose: ProfileFeedWsClose,
  onError: ProfileFeedWsError,
  onMessage: ProfileFeedWsMessage,
}

export const connectWebSocket = (socketUrl) => (dispatch) => {
  let socketInstance = new WebSocket(socketUrl);
  socketInstance.onopen = () => {
    dispatch({ type: WebSocketConnection, payload: { "url": socketUrl} });
  };
};