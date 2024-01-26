import { ProfileFeedWsClose, ProfileFeedWsOpen, ProfileFeedWsConnecting,ProfileFeedWsError,ProfileFeedWsMessage } from '../actions/profile-feed-actions';
import { WebsocketStatus } from '../../utils/web-socket-utils';
import { createReducer } from '@reduxjs/toolkit';
import { Order } from '../../components/orders-zone/orders-zone';


type ProfileFeedStateType = {
  status: WebsocketStatus,
  profileOrders: null|Order[],
  connectingError: string
}
const initialState: ProfileFeedStateType = {
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
      state.connectingError = typeof action.payload === 'string' ? action.payload : '';
    })
    .addCase(ProfileFeedWsMessage, (state, action) => {
      if (action.payload) {
        state.profileOrders = action.payload.orders || [];
      }
    })
})

