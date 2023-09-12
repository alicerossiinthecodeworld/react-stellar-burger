import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import { BurgerContextProvider } from '../../services/BurgerContext';

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