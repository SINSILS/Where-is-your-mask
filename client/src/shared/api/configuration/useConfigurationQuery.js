import useAppQuery from 'shared/api/query-client/useAppQuery';
import { getConfiguration } from 'shared/api/http/configuration';

export const createConfigurationQueryKey = () => 'configuration';

const useConfigurationQuery = () => useAppQuery(createConfigurationQueryKey(), getConfiguration);

export default useConfigurationQuery;
