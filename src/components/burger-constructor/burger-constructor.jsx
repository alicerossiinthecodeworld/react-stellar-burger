import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {
  addIngredient,
  removeIngredient,
  calculateTotalCost,
  updateIngredientOrder, // Новый экшен для обновления порядка ингредиентов
} from '../../services/burger-constructor-slice';
import { fetchIngredients } from '../../services/ingredient-slice';

import { createOrder, clearOrder } from '../../services/order-details-slice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getIngredientCount } from '../burger-ingredients/burger-ingredients';

function BurgerConstructor() {
  const ItemType = 'INGREDIENT';
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.data);
  const totalCost = useSelector((state) => state.burgerConstructor.totalCost);
  const selectedIngredients = useSelector(
    (state) => state.burgerConstructor.selectedIngredients
  );
  const orderNumber = useSelector((state) => state.orderDetails.order.number);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (ingredients.data) {
      let bunAdded = false;

      for (const ingredient of ingredients.data) {
        if (ingredient.type === 'bun') {
          if (!bunAdded) {
            dispatch(addIngredient(ingredient));
            bunAdded = true;
          }
        } else {
          dispatch(addIngredient(ingredient));
        }
      }
    }
  }, [ingredients.data]);

  useEffect(() => {
    dispatch(calculateTotalCost(selectedIngredients));
  }, [dispatch, selectedIngredients]);

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      if (item.ingredient.type === 'bun') {
        handleRemoveIngredient(selectedBun._id);
        console.log("удалил булку")
        console.log(selectedIngredients)
        selectedBun = item.ingredient;
        dispatch(addIngredient(item.ingredient));
        dispatch(calculateTotalCost(selectedIngredients));
      } else {
        dispatch(addIngredient(item.ingredient));
        dispatch(calculateTotalCost(selectedIngredients));
      }
    },
  });

  const selectedFilling = selectedIngredients.filter((item) => item.type !== 'bun');
  let selectedBun = selectedIngredients.find((item) => item.type === 'bun');

  const handleOrderClick = () => {
    const ingredientIds = selectedIngredients?.map((item) => item._id);
    dispatch(createOrder(ingredientIds));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    dispatch(clearOrder());
    setShowModal(false);
  };
  const handleRemoveIngredient = (ingredientId) => {
    dispatch(removeIngredient({ _id: ingredientId }));
    dispatch(calculateTotalCost(selectedIngredients));
    getIngredientCount(selectedIngredients, ingredientId);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    
    const fillingIngredients = selectedIngredients.filter(
      (ingredient) => ingredient.type !== 'bun'
    );
    const bunIngredients = selectedIngredients.filter(
      (ingredient) => ingredient.type === 'bun'
    );
  
    const updatedFillingIngredients = [...fillingIngredients];
    const [movedFillingIngredient] = updatedFillingIngredients.splice(
      result.source.index - bunIngredients.length,
      1
    );
    updatedFillingIngredients.splice(
      result.destination.index - bunIngredients.length,
      0,
      movedFillingIngredient
    );
  
    console.log('fillingIngredients:', fillingIngredients);
    console.log('updatedFillingIngredients:', updatedFillingIngredients);
    
    const updatedIngredientsCombined = [...bunIngredients, ...updatedFillingIngredients];
  
    console.log('updatedIngredientsCombined:', updatedIngredientsCombined);
  
    dispatch(updateIngredientOrder(updatedIngredientsCombined));
  };
  
  return (
    <div className={constructorStyles.burgerConstructor} ref={drop}>
      <div className={constructorStyles.topBun}>
        <ConstructorElement
          text={`${selectedBun?.name} (верх)`}
          price={selectedBun?.price}
          thumbnail={selectedBun?.image_large}
          type="top"
          isLocked
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="selectedIngredients">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={constructorStyles.ingredientsWrapper}
            >
              <div className={constructorStyles.scrollableContent}>
                {selectedFilling && selectedFilling.map((item, index) => (
                  <Draggable
                    key={`${item._id}_${index}`}
                    draggableId={`${item._id}_${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onDrag={(e) => e.preventDefault()}
                        className={constructorStyles.ingredientWrapper}
                      >
                        <DragIcon type="primary" />
                        <ConstructorElement
                          className={constructorStyles.item}
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image_large}
                          type={item.type === 'bun' ? 'top' : undefined}
                          isLocked={item.type === 'bun'}
                          handleClose={() => {
                            handleRemoveIngredient(item._id);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className={constructorStyles.bottomBun}>
        <ConstructorElement
          text={`${selectedBun?.name} (низ)`}
          price={selectedBun?.price}
          thumbnail={selectedBun?.image_large}
          type="bottom"
          isLocked
        />
      </div>
      <div className={constructorStyles.order}>
        <div className={constructorStyles.orderPrice}>
          {totalCost}
          <CurrencyIcon className={constructorStyles.orderIcon} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >
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