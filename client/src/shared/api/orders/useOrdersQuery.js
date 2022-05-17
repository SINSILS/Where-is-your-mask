import useAppQuery from 'shared/api/query-client/useAppQuery';
import { getOrders } from 'shared/api/http/orders';

export const createOrdersQueryKey = () => 'orders';

const useOrdersQuery = () => useAppQuery(createOrdersQueryKey(), getOrders, { refetchOnMount: 'always' });

export default useOrdersQuery;
