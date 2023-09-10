import { createContext, useEffect, useState } from 'react';

export const BurgerContext = createContext();

export const BurgerContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    setIsLoading(true);
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при загрузке данных');
        }
      })
      .then((data) => {
        setIngredients(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setHasError(true);
        setIsLoading(false);
      });
  };

  return (
    <BurgerContext.Provider value={{ ingredients, isLoading, hasError, fetchIngredients }}>
      {children}
    </BurgerContext.Provider>
  );
};