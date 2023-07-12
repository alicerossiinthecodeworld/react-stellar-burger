import React from 'react';
import styles from './app.module.css';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import withIngredientsFetch from '../hocs/with-ingredients-fetch';

function App({ ingredients, isLoading, hasError }) {
  return (
    <div>
      <AppHeader />
      <div className={styles.burgerZone}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading && !hasError && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </div>
    </div>
  );
}

export default withIngredientsFetch(App);