import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burgerConstructor.module.css';
import { data } from '../../utils/data';
import { ingredientPropType} from '../../utils/prop-types';

function BurgerConstructor() {
  const bun = data.find((item) => item.type === 'bun');
  const ingredients = data.filter((item) => item.type !== 'bun');

  return (
    <div className={constructorStyles.burgerConstructor}>
      <div className={constructorStyles.topBun}>
        <ConstructorElement
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_large}
          type="top"
          isLocked
        />
      </div>
      <div className={constructorStyles.ingredientsWrapper}>
        <div className={constructorStyles.scrollableContent}>
          {ingredients.map((item, index) => (
            <div key={item._id} className={constructorStyles.ingredientWrapper}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_large}
                type={item.type === 'bun' ? 'top' : undefined}
                isLocked={item.type === 'bun'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={constructorStyles.bottomBun}>
        <ConstructorElement
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_large}
          type="bottom"
          isLocked
        />
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};


export default BurgerConstructor;