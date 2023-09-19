import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import boxStyles from './ingredient-box-item.module.css';

function IngredientBoxItem(props) {
  const { imageSrc, alt, price, name, ingredient } = props;
  const [count, setCount] = useState(ingredient.count || 0);

  const [, ref] = useDrag({
    type: 'INGREDIENT',
    item: { ingredient },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        if (item.type !== "bun")
        {setCount(count + 1);}
      }
    },
  });

  return (
    <div
      className={boxStyles.ingredient__boxItem}
      onClick={props.onClick}
      draggable="true"
      ref={ref}
    >
      <img src={imageSrc} alt={alt} className={boxStyles.ingredient__image} />
      <p className={boxStyles.ingredient__price}>
        {price} <CurrencyIcon type="primary" />
      </p>
      <h3 className={boxStyles.ingredient__name}>{name}</h3>
      <Counter className={boxStyles.ingredient__counter} count={count} size="small" />
    </div>
  );
}

IngredientBoxItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredient: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default IngredientBoxItem;
