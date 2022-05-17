import { useMutation, useQueryClient } from 'react-query';
import { updateCollection } from 'shared/api/http/collections';
import { createCollectionsQueryKey } from 'shared/api/collections/useCollectionsQuery';
import { createCollectionQueryKey } from 'shared/api/collections/useCollectionQuery';

const useMutateUpdateCollection = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ id, collection }) => updateCollection(id, collection), {
    ...options,
    onSuccess: (data, payload) => {
      if (queryClient.getQueryData(createCollectionQueryKey(payload.id))) {
        queryClient.setQueryData(createCollectionQueryKey(payload.id), data);
      }

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
