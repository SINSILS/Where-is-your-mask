import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import storage from 'core/storage';
import { useUpdateEffect } from 'react-use';
import useNotification from 'core/notification';

const cartContext = createContext(undefined);

const storageKey = 'cart';

export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const { showSuccessNotification } = useNotification();

  const [cartItems, setCartItems] = useState(() => storage.getItem(storageKey) ?? []);

  useUpdateEffect(() => {
    storage.setItem(storageKey, cartItems);
  }, [cartItems]);

  const addToCart = useCallback(
    (item) => {
      setCartItems((prevItems) => [...prevItems, item]);
      showSuccessNotification({ message: 'Added to cart successfully' });
    },
    [showSuccessNotification],
  );

  const removeFromCart = useCallback(
    (index) => {
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
      showSuccessNotification({ message: 'Removed from cart successfully' });
    },
    [showSuccessNotification],
  );

  const context = useMemo(
    () => ({
      items: cartItems,
      add: addToCart,
      remove: removeFromCart,
    }),
    [addToCart, cartItems, removeFromCart],
  );

  return <cartContext.Provider value={context}>{children}</cartContext.Provider>;
};
