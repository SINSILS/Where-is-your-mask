import useAppQuery from 'shared/api/query-client/useAppQuery';
import { getOrder } from 'shared/api/http/orders';

export const createOrderQueryKey = (id) => ['order', id];

const useOrderQuery = (id) => useAppQuery(createOrderQueryKey(id), () => getOrder(id));

export default useOrderQuery;
