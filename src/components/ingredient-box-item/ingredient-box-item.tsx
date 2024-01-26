import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import boxStyles from './ingredient-box-item.module.css';
import { Ingredient } from '../burger-ingredients/burger-ingredients'
import React from 'react';

type Props = {
  imageSrc: string,
  alt: string,
  price: number,
  name: string,
  ingredient: Ingredient, 
  onClick: () => void,
  ingredientCount: number
};

function IngredientBoxItem({ imageSrc, alt, price, name, ingredient, onClick, ingredientCount }: Props) {
  const [, ref] = useDrag({
    type: 'INGREDIENT',
    item: { ingredient }
  });

  return (
    <div
      className={boxStyles.ingredient__boxItem}
      onClick={onClick}
      draggable="true"
      ref={ref}
    >
      <img src={imageSrc} alt={alt} className={boxStyles.ingredient__image} />
      <p className={boxStyles.ingredient__price}>
        {price} <CurrencyIcon type="primary" />
      </p>
      <h3 className={boxStyles.ingredient__name}>{name}</h3>
      <div className={boxStyles.ingredient__counter}>
        <Counter count={ingredientCount} size="small" />
      </div>
    </div>
  );
}

export default IngredientBoxItem;
