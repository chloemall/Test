import React, { createContext, useReducer, useContext } from "react";

const BasketContext = createContext();

const initialState = {
  basket: [],
};

const basketReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET": {
      const existingProduct = state.basket.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    }
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  return (
    <BasketContext.Provider value={{ basket: state.basket, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
