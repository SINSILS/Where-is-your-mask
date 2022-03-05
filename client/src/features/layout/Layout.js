import { AppShell } from '@mantine/core';
import Header from 'features/layout/Header';

const Layout = ({ children }) => (
  <AppShell
    padding="md"
    header={<Header />}
    styles={(theme) => ({
      main: { backgroundColor: theme.colors.gray[0] },
    })}
  >
    {children}
  </AppShell>
);

export default Layout;
