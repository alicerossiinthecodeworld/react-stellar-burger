import { createStore } from 'redux';
import { burgerReducer } from './reducers/burgerConstructorReducer'; // Импортируйте ваш редюсер

const store = createStore(burgerReducer);

export default store;