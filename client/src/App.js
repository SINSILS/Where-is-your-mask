import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { THEME } from 'theme/theme';
import Layout from 'features/layout/Layout';
import IndexPage from 'pages/IndexPage';
import FabricMaskModelingPage from 'pages/fabric/FabricMaskModelingPage';
import MedicalMaskModelingPage from 'pages/medical/MedicalMaskModelingPage';
import { CartProvider } from 'core/cart';
import CollectionPage from "./pages/fabric/CollectionPage";

const App = () => (
  <MantineProvider theme={THEME} withNormalizeCSS withGlobalStyles>
    <TypographyStylesProvider>
      <CartProvider>
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
                <Route path="fabric">
                  <Route exact path="collection" element={<CollectionPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Layout>
      </CartProvider>
    </TypographyStylesProvider>
  </MantineProvider>
);

export default App;
