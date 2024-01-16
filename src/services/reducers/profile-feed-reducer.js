import { ProfileFeedWsClose, ProfileFeedWsOpen, ProfileFeedWsConnecting,ProfileFeedWsError,ProfileFeedWsMessage } from '../actions/profile-feed-actions';
import { WebsocketStatus } from '../../utils/web-socket-utils';
import { createReducer } from '@reduxjs/toolkit';


const initialState = {
  status: WebsocketStatus.OFFLINE,
  profileOrders: [],
  connectingError: ''
}

export const ProfileFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ProfileFeedWsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(ProfileFeedWsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(ProfileFeedWsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(ProfileFeedWsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(ProfileFeedWsMessage, (state, action) => {
      state.profileOrders = action.payload.orders
    })
})

