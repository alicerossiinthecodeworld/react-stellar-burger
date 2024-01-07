import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import ingredientsReducer from './ingredient-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderDetailsReducer from './order-details-slice';
import authReducer from './auth-slice';
import activeTabReducer from './active-tab-slice';
import ordersSliceReducer from './orders-slice';
import profileOrdersReducer from './profile-orders-slice';
import webSocketReducer from './web-socket-slice';
import { socketMiddleware } from './web-socket-middleware';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  activeTab: activeTabReducer,
  orders: ordersSliceReducer,
  profileOrders: profileOrdersReducer,
  webSocket: webSocketReducer,
};

const middleware = [
  ...getDefaultMiddleware(), 
  socketMiddleware(), 
];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export default store;
