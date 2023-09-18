import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotalCost, removeIngredient, addIngredient } from '../../services/burger-constructor-reducer';
import { fetchIngredients } from '../../services/ingredient-slice';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { request } from '../../utils/api-config';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const dispatch = useDispatch(); 
  const ingredients = useSelector((state) => state.ingredients.data);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const totalCost = useSelector((state) => state.burgerConstructor.totalCost);

  useEffect(() => {
    dispatch(fetchIngredients())
    console.log(ingredients)
    if (ingredients.data !== undefined) {
      ingredients.data.forEach((ingredient) => {
        dispatch(addIngredient(ingredient));
      });
    }
  }, []);

  useEffect(() => {
  if (ingredients.data !== undefined) {
      ingredients.data.forEach((ingredient) => {
        dispatch(addIngredient(ingredient));
      });
    }
  }, [ingredients]);


  const selectedIngredients = useSelector((state) => state.burgerConstructor.selectedIngredients);
  const bun = ingredients?.data?.find((item) => item.type === 'bun');
  const filling = ingredients?.data?.filter((item) => item.type !== 'bun');

  const selectedFilling = filling?.filter((item) => {
    return selectedIngredients.some((selectedItem) => selectedItem._id === item._id);
  });

  const handleOrderClick = () => {
    const ingredientIds = ingredients?.data?.map((item) => item._id);
    request("/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    })
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

  const handleRemoveIngredient = (ingredientId) => {
    console.log('Before Removal - selectedIngredients:', selectedIngredients);
    dispatch(removeIngredient({ _id: ingredientId }));
    console.log('After Removal - selectedIngredients:', selectedIngredients);
    dispatch(calculateTotalCost(selectedIngredients));
    console.log('Total Cost:', totalCost);
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

      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <OrderDetails orderNumber={orderNumber} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
