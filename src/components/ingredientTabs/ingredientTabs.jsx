import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabsStyles from './ingredientTabs.module.css';

function IngredientTabs() {
  const [current, setCurrent] = useState('buns');

  const handleTabClick = (value) => {
    setCurrent(value);
  };

  return (
    <div className={tabsStyles.ingredient__tabs}>
      <a href="#buns" className={tabsStyles.ingredient__tab} id='bunsAnc'>
        <Tab value="buns" active={current === 'buns'} onClick={handleTabClick}>
          Булки
        </Tab>
      </a>
      <a href="#sauces" className={tabsStyles.ingredient__tab} id='sauceAnc'>
        <Tab value="sauces" active={current === 'sauces'} onClick={handleTabClick}>
          Соусы
        </Tab>
      </a>
      <a href="#fillings" className={tabsStyles.ingredient__tab} id='fillingsAnc'>
        <Tab value="fillings" active={current === 'fillings'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export default IngredientTabs;