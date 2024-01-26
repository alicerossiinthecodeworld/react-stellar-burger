import { createAction } from "@reduxjs/toolkit";
import { Order } from "../../components/orders-zone/orders-zone";

export interface ProfileFeedWsMessagePayload {
  orders: Order[];
}
export const PROFILE_FEED_CONNECT = 'PROFILE_FEED_CONNECT';
export const PROFILE_FEED_DISCONNECT = 'PROFILE_FEED_DISCONNECT'
export const PROFILE_FEED_CONNECTING = 'PROFILE_FEED_CONNECTING'
export const PROFILE_FEED_OPEN = 'PROFILE_FEED_OPEN'
export const PROFILE_FEED_CLOSE = 'PROFILE_FEED_CLOSE'
export const PROFILE_FEED_WS_MESSAGE = 'PROFILE_FEED_MESSAGE'
export const PROFILE_FEED_WS_ERROR = 'PROFILE_FEED_ERROR'



export const ProfileFeedWsConnect =  createAction(PROFILE_FEED_CONNECT);
export const ProfileFeedWsDisconnect = createAction(PROFILE_FEED_DISCONNECT);
export const ProfileFeedWsConnecting = createAction(PROFILE_FEED_CONNECTING);
export const ProfileFeedWsOpen = createAction(PROFILE_FEED_OPEN);
export const ProfileFeedWsClose = createAction(PROFILE_FEED_CLOSE);
export const ProfileFeedWsMessage = createAction<ProfileFeedWsMessagePayload>(PROFILE_FEED_WS_MESSAGE);
export const ProfileFeedWsError = createAction<Event>(PROFILE_FEED_WS_ERROR);
