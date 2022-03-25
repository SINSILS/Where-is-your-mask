import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import storage from 'core/storage';
import { useMount } from 'react-use';
import api from 'core/api';
import { useNavigate } from 'react-router-dom';

const context = createContext({
  isAdmin: false,
  isLoading: false,
});

const accessTokenStorageKey = 'access-token';

export const useUser = () => useContext(context);

// don't do this
const setAccessToken = (token) => storage.setItem(accessTokenStorageKey, token);

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(() => !!storage.getItem(accessTokenStorageKey));

  const navigate = useNavigate();

  useMount(() => {
    if (isLoading) {
      api
        .get('users/me')
        .then(() => setIsAdmin(true))
        .catch(() => setIsAdmin(false))
        .finally(() => setIsLoading(false));
    }
  });

  const handleLogout = useCallback(() => {
    storage.removeItem(accessTokenStorageKey);
    setIsAdmin(false);
    navigate('/');
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      isAdmin,
      isLoading,
      setAccessToken,
      logout: handleLogout,
    }),
    [isAdmin, isLoading, handleLogout],
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};
