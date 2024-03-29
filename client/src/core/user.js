import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import storage from 'core/storage';
import { useMount } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'shared/api/http/user';
import useNotification from 'core/notification';

const context = createContext({
  isAdmin: false,
  isLoading: false,
});

const accessTokenStorageKey = 'access-token';

export const useUser = () => useContext(context);

// don't do this
const setAccessToken = (token) => storage.setItem(accessTokenStorageKey, token);

export const UserProvider = ({ children }) => {
  const { showSuccessNotification } = useNotification();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(() => !!storage.getItem(accessTokenStorageKey));

  const navigate = useNavigate();

  useMount(() => {
    if (isLoading) {
      getCurrentUser()
        .then(() => setIsAdmin(true))
        .catch(() => setIsAdmin(false))
        .finally(() => setIsLoading(false));
    }
  });

  const handleLogout = useCallback(() => {
    storage.removeItem(accessTokenStorageKey);
    setIsAdmin(false);
    navigate('/');
    showSuccessNotification({ message: 'Logged out successfully' });
  }, [showSuccessNotification, navigate]);

  const handleSetAccessToken = useCallback((token) => {
    setAccessToken(token);
    setIsAdmin(true);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAdmin,
      isLoading,
      setAccessToken: handleSetAccessToken,
      logout: handleLogout,
    }),
    [isAdmin, isLoading, handleLogout, handleSetAccessToken],
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};
