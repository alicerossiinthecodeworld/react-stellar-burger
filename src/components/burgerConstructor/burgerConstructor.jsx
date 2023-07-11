import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button, Modal } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burgerConstructor.module.css';
import { ingredientPropType } from '../../utils/prop-types';
import OrderDetails from '../orderDetails/orderDetails';
import ModalOverlay from '../modalOverlay/modalOverlay';

function BurgerConstructor({ ingredients, isLoading, hasError }) {
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return <div>Loading ingredients...</div>;
  }
  if (hasError) {
    console.log("Error occurred while fetching ingredients");
  }

  if (!Array.isArray(ingredients.data) || ingredients.data.length === 0) {
    return <div>No ingredients available.</div>;
  }

  const bun = ingredients.data.find((item) => item.type === 'bun');
  const filling = ingredients.data.filter((item) => item.type !== 'bun');
  const calculateTotalPrice = () => {
    const total = filling.reduce((acc, ingredient) => acc + ingredient.price, 0);
    return total + bun.price;
  };

  const handleOrderClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
          {filling.map((item, index) => (
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
      <div className={constructorStyles.order}>
        <div className={constructorStyles.orderPrice}>
          {calculateTotalPrice()}
          <CurrencyIcon className={constructorStyles.orderIcon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {showModal && (
        <ModalOverlay onClose={handleCloseModal}>
          <OrderDetails orderNumber="123456" onClose={handleCloseModal} />
        </ModalOverlay>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default BurgerConstructor;