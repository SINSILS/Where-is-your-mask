import { useMutation, useQueryClient } from 'react-query';
import { createMask } from 'shared/api/http/collections';
import { createCollectionQueryKey } from 'shared/api/collections/useCollectionQuery';

const useMutateCreateMask = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ collectionId, mask }) => createMask(collectionId, mask), {
    ...options,
    onSuccess: (data, payload) => {
      queryClient.setQueryData(createCollectionQueryKey(payload.collectionId), (prevCollection) => ({
        ...prevCollection,
        masks: [...prevCollection.masks, data],
      }));
      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateCreateMask;
