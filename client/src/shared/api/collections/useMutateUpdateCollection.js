import { useMutation, useQueryClient } from 'react-query';
import { updateCollection } from 'shared/api/http/collections';
import { createCollectionsQueryKey } from 'shared/api/collections/useCollectionsQuery';

const useMutateUpdateCollection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ id, collection }) => updateCollection(id, collection), {
    ...options,
    onSuccess: (data, payload) => {
      if (queryClient.getQueryData(createCollectionsQueryKey())) {
        queryClient.setQueryData(createCollectionsQueryKey(), (prevCollections) =>
          prevCollections.map((c) => c.id === payload.id ? data : c),
        );
      }

      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateUpdateCollection;
