import { useMutation, useQueryClient } from 'react-query';
import { createCollection } from 'shared/api/http/collections';
import { createCollectionsQueryKey } from 'shared/api/collections/useCollectionsQuery';

const useMutateCreateCollection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(createCollection, {
    ...options,
    onSuccess: (data, payload) => {
      queryClient.setQueryData(createCollectionsQueryKey(), (prevCollections) => [data, ...prevCollections]);
      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateCreateCollection;
