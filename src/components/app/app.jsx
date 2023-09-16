import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BurgerContextProvider } from '../../services/burger-context';

function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.burgerZone}>
        <BurgerContextProvider>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContextProvider>
      </main>
    </div>
  );
}

export default App;