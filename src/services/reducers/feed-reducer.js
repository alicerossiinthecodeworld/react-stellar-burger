import { WebsocketStatus } from '../../utils/web-socket-utils';
import { FeedWsClose, FeedWsOpen, FeedWsConnecting, FeedWsError, FeedWsMessage}
from '../actions/feed-actions';
import {createReducer} from '@reduxjs/toolkit'

const feedinitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,  
  connectingError: ''
}

export const feedReducer = createReducer(feedinitialState, (builder) => {
  builder
    .addCase(FeedWsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(FeedWsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(FeedWsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(FeedWsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(FeedWsMessage, (state, action) => {
      state.orders = action.payload.orders
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    })
})