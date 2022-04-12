import { useNotifications } from '@mantine/notifications';
import { useCallback } from 'react';
import { useLatest } from 'react-use';

const useNotification = () => {
  const { showNotification } = useNotifications();

  const showNotificationRef = useLatest(showNotification);

  return {
    showSuccessNotification: useCallback(
      ({ message }) => showNotificationRef.current({ title: 'Success', message, color: 'green' }),
      [showNotificationRef],
    ),
    showErrorNotification: useCallback(
      ({ message }) => showNotificationRef.current({ title: 'Error occurred', message, color: 'red' }),
      [showNotificationRef],
    ),
  };
};

export default useNotification;
