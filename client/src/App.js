import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { THEME } from 'theme/theme';
import Layout from 'features/layout/Layout';
import IndexPage from 'pages/IndexPage';
import FabricMaskModelingPage from 'pages/fabric/FabricMaskModelingPage';
import MedicalMaskModelingPage from 'pages/medical/MedicalMaskModelingPage';

const App = () => (
  <MantineProvider theme={THEME} withNormalizeCSS withGlobalStyles>
    <TypographyStylesProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route exact index element={<IndexPage />} />
              <Route path="fabric">
                <Route exact path="design" element={<FabricMaskModelingPage />} />
              </Route>
              <Route path="medical">
                <Route exact path="design" element={<MedicalMaskModelingPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </TypographyStylesProvider>
  </MantineProvider>
);

export default App;