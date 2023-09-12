import { createContext, useEffect, useState } from 'react';

export const BurgerContext = createContext();
export const BASE_URL = 'https://norma.nomoreparties.space/api'


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const BurgerContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchIngredients();
  }, []);
  
  const fetchIngredients = () => {
    setIsLoading(true);
    request("/ingredients")
      .then((data) => {
        setIngredients(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <BurgerContext.Provider value={{ ingredients, isLoading, fetchIngredients }}>
      {children}
    </BurgerContext.Provider>
  );
};