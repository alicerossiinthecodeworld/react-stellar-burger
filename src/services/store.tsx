import { AnyAction, configureStore, Dispatch, Middleware, Store} from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import ingredientsReducer from './ingredient-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderDetailsReducer from './order-details-slice';
import authReducer from './auth-slice';
import activeTabReducer from './active-tab-slice';
import {socketMiddleware } from './web-socket-middleware';
import { feedReducer } from './reducers/feed-reducer';
import { wsFeedActions, wsProfileActions } from '../utils/web-socket-utils';
import { ProfileFeedReducer } from './reducers/profile-feed-reducer';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  activeTab: activeTabReducer,
  orders: feedReducer,
  profileOrders: ProfileFeedReducer,
};

export const middle1 = socketMiddleware(wsFeedActions);
export const middle2 = socketMiddleware(wsProfileActions);


const store: Store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
  }).concat(middle1, middle2),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type CustomError = {
  message: string;
};
export default store;

