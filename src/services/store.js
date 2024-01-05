import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from './burger-constructor-slice';
import ingredientsReducer from './ingredient-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderDetailsReducer from './order-details-slice';
import authReducer from './auth-slice';
import activeTabReducer from './active-tab-slice';
import ordersSliceReducer from './orders-slice';
import profileOrdersReducer from './profile-orders-slice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  activeTab: activeTabReducer,
  orders: ordersSliceReducer,
  profileOrders: profileOrdersReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
