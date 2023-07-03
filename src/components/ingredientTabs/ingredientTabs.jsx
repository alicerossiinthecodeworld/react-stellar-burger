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
      <Tab value="buns" active={current === 'buns'} onClick={handleTabClick}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={handleTabClick}>
        Cоусы
      </Tab>
      <Tab value="fillings" active={current === 'fillings'} onClick={handleTabClick}>
        Начинки
      </Tab>
    </div>
  );
}

export default IngredientTabs;