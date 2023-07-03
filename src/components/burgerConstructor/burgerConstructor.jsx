import React from 'react';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burgerConstructor.module.css';

function BurgerConstructor() {
  const img = 'https://code.s3.yandex.net/react/code/meat-01-large.png';
  return (
    <div className={constructorStyles.burgerConstructor}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={img}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={img}
      />
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />
    </div>
  );
}

export default BurgerConstructor;