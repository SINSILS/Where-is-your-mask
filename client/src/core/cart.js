import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import storage from 'core/storage';
import { useUpdateEffect } from 'react-use';
import useNotification from 'core/notification';

const cartContext = createContext(undefined);

const storageKey = 'cart';

export const CART_ITEM_TYPE = {
  custom: 'custom',
  collection: 'collection',
};

export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const { showSuccessNotification } = useNotification();

  const [cartItems, setCartItems] = useState(() => storage.getItem(storageKey) ?? []);

  useUpdateEffect(() => {
    storage.setItem(storageKey, cartItems);
  }, [cartItems]);

  const addToCart = useCallback(
    (type, quantity, item) => {
      setCartItems((prevItems) => [...prevItems, { id: Date.now(), type, quantity, item }]);
      showSuccessNotification({ message: 'Added to cart successfully' });
    },
    [showSuccessNotification],
  );

  const updateCartItem = useCallback(
    (item) => setCartItems((prevItems) => prevItems.map((x) => (x.id === item.id ? item : x))),
    [],
  );

  const removeFromCart = useCallback(
    (id) => {
      setCartItems((prevItems) => prevItems.filter((x) => x.id !== id));
      showSuccessNotification({ message: 'Removed from cart successfully' });
    },
    [showSuccessNotification],
  );

  const clearCart = useCallback(() => setCartItems([]), []);

  const context = useMemo(
    () => ({
      items: cartItems,
      add: addToCart,
      update: updateCartItem,
      remove: removeFromCart,
      clear: clearCart,
    }),
    [addToCart, cartItems, removeFromCart, updateCartItem, clearCart],
  );

  return <cartContext.Provider value={context}>{children}</cartContext.Provider>;
};
