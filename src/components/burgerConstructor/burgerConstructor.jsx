import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burgerConstructor.module.css';
import OrderDetails from '../orderDetails/orderDetails';
import Modal from '../modal/modal';
import { BurgerContext } from '../../services/BurgerContext';
import { useBurgerConstructorReducer } from '../../services/reducers/burgerConstructorReducers';
import { CALCULATE_TOTAL_COST } from '../../services/actions/burgerConstructorActions';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null); 
  const { ingredients, isLoading, hasError } = useContext(BurgerContext);
  
  const [state, dispatch] = useBurgerConstructorReducer();

  useEffect(() => {
    if (!isLoading && !hasError && ingredients?.data && Array.isArray(ingredients.data)) {
      dispatch({ type: CALCULATE_TOTAL_COST, ingredients: ingredients.data });
    }
  }, [ingredients, isLoading, hasError]);

  const bun = ingredients?.data?.find((item) => item.type === 'bun');
  const filling = ingredients?.data?.filter((item) => item.type !== 'bun');

  const handleOrderClick = () => {
    const ingredientIds = ingredients?.data?.map((item) => item._id);
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.order?.number) {
          setOrderNumber(data.order.number);
          setShowModal(true);
        } else {
          console.error('Failed to create order:', data);
        }
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <div>Loading ingredients...</div>;
  }

  if (hasError) {
    return <div>Error occurred while fetching ingredients</div>;
  }

  if (!ingredients?.data || ingredients.data.length === 0) {
    return <div>No ingredients available.</div>;
  }

  return (
    <div className={constructorStyles.burgerConstructor}>
      <div className={constructorStyles.topBun}>
        <ConstructorElement
          text={`${bun?.name} (верх)`}
          price={bun?.price}
          thumbnail={bun?.image_large}
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
          text={`${bun?.name} (низ)`}
          price={bun?.price}
          thumbnail={bun?.image_large}
          type="bottom"
          isLocked
        />
      </div>
      <div className={constructorStyles.order}>
        <div className={constructorStyles.orderPrice}>
          {state.totalCost}
          <CurrencyIcon className={constructorStyles.orderIcon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = {
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default BurgerConstructor;
