import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burgerConstructor.module.css';
import { data } from '../../utils/data';

function BurgerConstructor() {
  return (
    <div className={constructorStyles.burgerConstructor}>
      {data.map((item) => (
        <ConstructorElement
          key={item._id}
          text={item.name}
          price={item.price}
          thumbnail={item.image_large}
          type={item.type === 'bun' ? 'top' : undefined}
          isLocked={item.type === 'bun'}
        />
      ))}
    </div>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;