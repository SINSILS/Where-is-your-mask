import { createContext, useContext, useMemo, useState } from 'react';
import storage from 'core/storage';
import { useUpdateEffect } from 'react-use';

const cartContext = createContext(undefined);

const storageKey = 'cart';

export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => storage.getItem(storageKey) ?? []);

  useUpdateEffect(() => {
    storage.setItem(storageKey, cartItems);
  }, [cartItems]);

  const addToCart = (item) => setCartItems((prevItems) => [...prevItems, item]);

  const removeFromCart = (index) => setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));

  const context = useMemo(
    () => ({
      items: cartItems,
      add: addToCart,
      remove: removeFromCart,
    }),
    [cartItems],
  );

  return <cartContext.Provider value={context}>{children}</cartContext.Provider>;
};
