import { useMutation, useQueryClient } from 'react-query';
import { deleteMask } from 'shared/api/http/collections';
import { createCollectionQueryKey } from 'shared/api/collections/useCollectionQuery';

const useMutateDeleteMask = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ collectionId, maskId }) => deleteMask(collectionId, maskId), {
    ...options,
    onSuccess: (data, payload) => {
      if (queryClient.getQueryData(createCollectionQueryKey(payload.collectionId))) {
        queryClient.setQueryData(createCollectionQueryKey(payload.collectionId), (prevCollection) => ({
          ...prevCollection,
          masks: prevCollection.masks.filter(m => m.id !== payload.maskId),
        }));
      }

      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateDeleteMask;
