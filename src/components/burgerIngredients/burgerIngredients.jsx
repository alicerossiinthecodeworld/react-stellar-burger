import React from 'react';
import IngredientTabs from '../ingredientTabs/ingredientTabs';
import ingredientsStyles from './burgerIngredients.module.css';
import IngredientBoxItem from '../ingredientBoxItem/ingredientBoxItem';

function BurgerIngredients() {
  return (
    <div>
      <h1 className={ingredientsStyles.ingredient__header}>Соберите бургер</h1>
      <IngredientTabs />
      <div className={ingredientsStyles.ingredient__boxWrapper}>
        <div className={ingredientsStyles.ingredient__box}>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Булки</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
          </div>
        </div>
        <div className={ingredientsStyles.ingredient__box}>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Cоусы</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />         <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />        </div>
        </div>
        <div className={ingredientsStyles.ingredient__box}>
          <h2 className={ingredientsStyles.ingredient__boxHeader}>Начинки</h2>
          <div className={ingredientsStyles.ingredient__boxItems}>
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />         <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />     <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />
            <IngredientBoxItem
              imageSrc="https://avatars.dzeninfra.ru/get-zen_doc/1056701/pub_5e19e3e332335400af534450_5e20650c3d5f6900b0ad4329/scale_1200"
              alt="Изображение ингредиента"
              price="9.99"
              name="Название ингредиента"
              count={233}
            />        </div>
        </div></div>
    </div>
  );
}

export default BurgerIngredients;
