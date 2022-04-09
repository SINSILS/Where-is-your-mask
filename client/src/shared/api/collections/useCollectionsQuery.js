import useAppQuery from 'shared/api/query-client/useAppQuery';
import { getCollections } from 'shared/api/http/collections';

export const createCollectionsQueryKey = () => 'collections';

const useCollectionsQuery = () => useAppQuery(createCollectionsQueryKey(), getCollections);

export default useCollectionsQuery;
