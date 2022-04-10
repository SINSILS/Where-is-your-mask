import useAppQuery from 'shared/api/query-client/useAppQuery';
import { getCollection } from 'shared/api/http/collections';

export const createCollectionQueryKey = (id) => ['collections', id];

const useCollectionQuery = (id) => useAppQuery(createCollectionQueryKey(id), () => getCollection(id));

export default useCollectionQuery;
