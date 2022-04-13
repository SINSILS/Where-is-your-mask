import { useQuery } from 'react-query';
import { useEffect } from 'react';
import useNotification from 'core/notification';

const useAppQuery = (...props) => {
  const queryResult = useQuery(...props);

  const { showErrorNotification } = useNotification();

  useEffect(() => {
    if (queryResult.isError) {
      showErrorNotification({
        message: 'Unknown error occurred. Please try again later.',
      });
    }
  }, [showErrorNotification, queryResult.isError]);

  return queryResult;
};

export default useAppQuery;
