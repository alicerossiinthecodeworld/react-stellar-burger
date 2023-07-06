import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import boxStyles from './ingredientBoxItem.module.css'
import { ingredientPropType } from '../../utils/prop-types';


function IngredientBoxItem(props) {
  const { imageSrc, alt, price, name, count } = props;

  return (
    <div className={boxStyles.ingredient__boxItem}>
      <img src={imageSrc} alt={alt} className={boxStyles.ingredient__image} />
      <p className={boxStyles.ingredient__price}>{price} <CurrencyIcon type="primary" /></p>
      <h3 className={boxStyles.ingredient__name}>{name}</h3>
      <Counter className={boxStyles.ingredient__counter} count={count} size="small" />
    </div>
  );
}

IngredientBoxItem.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default IngredientBoxItem;
