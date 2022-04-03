import { useQuery } from 'react-query';

// TODO: show error notification
const useAppQuery = (...props) => useQuery(...props);

export default useAppQuery;
