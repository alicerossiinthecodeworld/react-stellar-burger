import { createAction } from "@reduxjs/toolkit";
import { Order } from "../../components/orders-zone/orders-zone";

interface ProfileFeedWsMessagePayload {
  orders: Order[];
}

export const ProfileFeedWsConnect = createAction('PROFILE_FEED_CONNECT')
export const ProfileFeedWsDisconnect = createAction('PROFILE_FEED_DISCONNECT');
export const ProfileFeedWsConnecting = createAction('PROFILE_FEED_CONNECTING');
export const ProfileFeedWsOpen = createAction('PROFILE_FEED_OPEN');
export const ProfileFeedWsClose = createAction('PROFILE_FEED_CLOSE');
export const ProfileFeedWsMessage = createAction<ProfileFeedWsMessagePayload>('PROFILE_FEED_MESSAGE');
export const ProfileFeedWsError = createAction('PROFILE_FEED_ERROR');
