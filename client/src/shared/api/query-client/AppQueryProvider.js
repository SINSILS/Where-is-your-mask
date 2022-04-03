import { QueryClientProvider } from 'react-query';
import { appQueryClient } from 'shared/api/query-client/AppQueryClient';

const AppQueryProvider = ({ children }) => (
  <QueryClientProvider client={appQueryClient}>
    {children}
  </QueryClientProvider>
);

export default AppQueryProvider;
