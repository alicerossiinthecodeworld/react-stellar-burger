import { WebsocketStatus } from '../../utils/web-socket-utils';
import { FeedWsClose, FeedWsOpen, FeedWsConnecting, FeedWsError, FeedWsMessage }
  from '../actions/feed-actions';
import { createReducer } from '@reduxjs/toolkit'
import { Order } from '../../components/orders-zone/orders-zone';

type feedStateType = {
  status: WebsocketStatus,
  orders: null|Order[],
  total: number,
  totalToday: number,
  connectingError: string
}


const feedinitialState: feedStateType = {
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
      state.connectingError = typeof action.payload === 'string' ? action.payload : '';
    })
    .addCase(FeedWsMessage, (state, action) => {
      if (action.payload) {
        state.orders = action.payload.orders || [];
        state.total = action.payload.total || 0;
        state.totalToday = action.payload.totalToday || 0;
      }
    })
})