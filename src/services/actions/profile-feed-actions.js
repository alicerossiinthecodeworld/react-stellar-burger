import { createAction } from "@reduxjs/toolkit";

export const ProfileFeedWsConnect = createAction('PROFILE_FEED_CONNECT')
export const ProfileFeedWsDisconnect = createAction('PROFILE_FEED_DISCONNECT');
export const ProfileFeedWsConnecting = createAction('PROFILE_FEED_CONNECTING');
export const ProfileFeedWsOpen = createAction('PROFILE_FEED_OPEN');
export const ProfileFeedWsClose = createAction('PROFILE_FEED_CLOSE');
export const ProfileFeedWsMessage = createAction('PROFILE_FEED_MESSAGE');
export const ProfileFeedWsError = createAction('PROFILE_FEED_ERROR');
