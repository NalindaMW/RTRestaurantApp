import { createContext, useReducer } from "react";

// Cart Context
const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

// Cart context provider
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCardItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCarItem = state.items[existingCardItemIndex];

    let updatedItems;

    if (existingCarItem) {
      const updatedItem = {
        ...existingCarItem,
        amount: existingCarItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const existingCardItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCarItem = state.items[existingCardItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCarItem.price;

    let updatedItems;
    if (existingCarItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCarItem,
        amount: existingCarItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const value = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
