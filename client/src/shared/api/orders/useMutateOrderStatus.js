import { useMutation, useQueryClient } from 'react-query';
import { updateOrderStatus } from 'shared/api/http/orders';
import { createOrderQueryKey } from 'shared/api/orders/useOrderQuery';

const useMutateOrderStatus = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(({ id, status }) => updateOrderStatus(id, status), {
    ...options,
    onSuccess: (data, payload) => {
      console.log(createOrderQueryKey(payload.id), payload.status)
      queryClient.setQueryData(createOrderQueryKey(payload.id), (prevOrder) => ({
        ...prevOrder,
        status: payload.status,
      }));
      options.onSuccess?.(data, payload);
    },
  });
};

export default useMutateOrderStatus;
