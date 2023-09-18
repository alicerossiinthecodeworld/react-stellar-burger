import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Provider } from 'react-redux'; 
import store from '../../services/store';


function App() {
  return (
    <Provider store={store}>
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.burgerZone}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
    </div>
    </Provider>
  );
}

export default App;