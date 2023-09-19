import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotalCost, removeIngredient, addIngredient } from '../../services/burger-constructor-slice';
import { fetchIngredients } from '../../services/ingredient-slice';
import { createOrder, clearOrder } from '../../services/order-details-slice';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch(); 
  const ingredients = useSelector((state) => state.ingredients.data);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const totalCost = useSelector((state) => state.burgerConstructor.totalCost);
  const selectedIngredients = useSelector((state) => state.burgerConstructor.selectedIngredients);
  const orderNumber = useSelector((state) => state.orderDetails.order.number)


  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);

  useEffect(() => {
  if (ingredients.data !== undefined) {
      ingredients.data.forEach((ingredient) => {
        dispatch(addIngredient(ingredient));
      });
    }
  }, [ingredients]);

  useEffect(() => {
    dispatch(calculateTotalCost(selectedIngredients));
  }, [selectedIngredients]);

  const bun = ingredients?.data?.find((item) => item.type === 'bun');
  const filling = ingredients?.data?.filter((item) => item.type !== 'bun');
  const selectedFilling = filling?.filter((item) => {
    return selectedIngredients.some((selectedItem) => selectedItem._id === item._id);
  });

  const handleOrderClick = () => {
    const ingredientIds = selectedIngredients?.map((item) => item._id);
    dispatch(createOrder(ingredientIds))
    setShowModal(true)
  };

  const handleCloseModal = () => {
    dispatch(clearOrder)
    setShowModal(false);
  };

  const handleRemoveIngredient = (ingredientId) => {
    dispatch(removeIngredient({ _id: ingredientId }));
    dispatch(calculateTotalCost(selectedIngredients));
  };

  if (isLoading) {
    return <div>Loading ingredients...</div>;
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
          {selectedFilling.map((item) => (
            <div key={item._id} className={constructorStyles.ingredientWrapper}>
              <DragIcon type="primary" />
              <ConstructorElement
                className={constructorStyles.item}
                text={item.name}
                price={item.price}
                thumbnail={item.image_large}
                type={item.type === 'bun' ? 'top' : undefined}
                isLocked={item.type === 'bun'}
                handleClose={()=> {handleRemoveIngredient(item._id)}}
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
          {totalCost}
          <CurrencyIcon className={constructorStyles.orderIcon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {showModal &&(
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
