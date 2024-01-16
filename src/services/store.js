import { configureStore, createReducer } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import ingredientsReducer from './ingredient-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderDetailsReducer from './order-details-slice';
import authReducer from './auth-slice';
import activeTabReducer from './active-tab-slice';
import { socketMiddleware } from './web-socket-middleware';
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

const middle1 = socketMiddleware(
  {neededUrl: 'wss://norma.nomoreparties.space/orders?token=', wsActions: wsFeedActions, isProfile: false, wsFeedActions});
const middle2 = socketMiddleware({neededUrl: 'wss://norma.nomoreparties.space/orders?token=', wsActions: wsProfileActions, isProfile: true});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middle1, middle2);
  }
})

export default store;

