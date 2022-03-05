import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { THEME } from 'theme/theme';
import Layout from 'features/layout/Layout';
import Landing from 'features/landing/Landing';

function App() {
  return (
    <MantineProvider theme={THEME} withNormalizeCSS>
      <TypographyStylesProvider>
        <Layout>
          <Landing />
        </Layout>
      </TypographyStylesProvider>
    </MantineProvider>
  );
}

export default App;
