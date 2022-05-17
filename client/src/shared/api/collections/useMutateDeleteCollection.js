import { useMutation, useQueryClient } from 'react-query';
import { deleteCollection } from 'shared/api/http/collections';
import { createCollectionsQueryKey } from 'shared/api/collections/useCollectionsQuery';

const useMutateDeleteCollection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(deleteCollection, {
    ...options,
    onSuccess: (data, payload) => {
      if (queryClient.getQueryData(createCollectionsQueryKey())) {
        queryClient.setQueryData(createCollectionsQueryKey(), (prevCollections) =>
          prevCollections.filter((c) => c.id !== payload),
        );
      }

      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateDeleteCollection;
