import { useMutation, useQueryClient } from 'react-query';
import { createConfigurationQueryKey } from 'shared/api/configuration/useConfigurationQuery';

const useMutateConfiguration = (mutation, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(mutation, {
    ...options,
    onSuccess: (data, payload) => {
      queryClient.setQueryData(createConfigurationQueryKey(), data);
      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateConfiguration;
