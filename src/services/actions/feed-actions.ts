import { createAction } from "@reduxjs/toolkit";
import { Order } from "../../components/orders-zone/orders-zone";

export interface FeedWsMessagePayload {
  orders: Order[];
  total: number;
  totalToday: number;
}

export const FEED_CONNECT = 'FEED_CONNECT';
export const FEED_DISCONNECT = 'FEED_DISCONNECT'
export const FEED_CONNECTING = 'FEED_CONNECTING'
export const FEED_OPEN = 'FEED_OPEN'
export const FEED_CLOSE = 'FEED_CLOSE'
export const FEED_WS_MESSAGE = 'feed/WS_MESSAGE'
export const FEED_WS_ERROR = 'FEED_ERROR'
export const WS_CONNECTION = 'wsConnection'

export const FeedWsConnect = createAction(FEED_CONNECT);
export const FeedWsDisconnect = createAction(FEED_DISCONNECT);
export const FeedWsConnecting = createAction(FEED_CONNECTING);
export const FeedWsOpen = createAction(FEED_OPEN);
export const FeedWsClose = createAction(FEED_CLOSE);
export const FeedWsMessage = createAction<FeedWsMessagePayload>(FEED_WS_MESSAGE);
export const FeedWsError = createAction(FEED_WS_ERROR);
export const WebSocketConnection = WS_CONNECTION