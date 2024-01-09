import { createAction } from "@reduxjs/toolkit";

export const FeedWsConnect = createAction('FEED_CONNECT')
export const FeedWsDisconnect = createAction('FEED_DISCONNECT');
export const FeedWsConnecting = createAction('FEED_CONNECTING');
export const FeedWsOpen = createAction('FEED_OPEN');
export const FeedWsClose = createAction('FEED_CLOSE');
export const FeedWsMessage = createAction('FEED_MESSAGE');
export const FeedWsError = createAction('FEED_ERROR');
export const WebSocketConnection = 'wsConnection'