import { createAction } from "@reduxjs/toolkit";
import { Order } from "../../components/orders-zone/orders-zone";

interface FeedWsMessagePayload {
  orders: Order[];
  total: number;
  totalToday: number;
}

export const FeedWsConnect = createAction('FEED_CONNECT')
export const FeedWsDisconnect = createAction('FEED_DISCONNECT');
export const FeedWsConnecting = createAction('FEED_CONNECTING');
export const FeedWsOpen = createAction('FEED_OPEN');
export const FeedWsClose = createAction('FEED_CLOSE');
export const FeedWsMessage = createAction<FeedWsMessagePayload>('feed/WS_MESSAGE');
export const FeedWsError = createAction('FEED_ERROR');
export const WebSocketConnection = 'wsConnection'