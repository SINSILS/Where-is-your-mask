import { useMutation, useQueryClient } from 'react-query';
import { updateMask } from 'shared/api/http/collections';
import { createCollectionQueryKey } from 'shared/api/collections/useCollectionQuery';

const useMutateUpdateMask = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ collectionId, maskId, mask }) => updateMask(collectionId, maskId, mask), {
    ...options,
    onSuccess: (data, payload) => {
      queryClient.setQueryData(createCollectionQueryKey(payload.collectionId), (prevCollection) => ({
        ...prevCollection,
        masks: prevCollection.masks.map(m => m.id === payload.maskId ? data : m),
      }));
      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateUpdateMask;
