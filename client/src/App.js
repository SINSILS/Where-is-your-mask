import { LoadingOverlay, MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { THEME } from 'theme/theme';
import Layout from 'features/layout/Layout';
import IndexPage from 'pages/IndexPage';
import FabricMaskModelingPage from 'pages/fabric/FabricMaskModelingPage';
import MedicalMaskModelingPage from 'pages/medical/MedicalMaskModelingPage';
import { CartProvider } from 'core/cart';
import CollectionPage from './pages/fabric/CollectionPage';
import LoginPage from 'pages/admin/LoginPage';
import { UserProvider, useUser } from 'core/user';

const Routing = () => {
  const { isLoading, isAdmin } = useUser();

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route exact index element={<IndexPage />} />
          <Route path="admin">
            <Route exact path="login" element={isAdmin ? <Navigate to="/" /> : <LoginPage />} />
            <Route index element={<Navigate to="/admin/login" />} />
          </Route>
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
    </Layout>
  );
};

const App = () => (
  <MantineProvider theme={THEME} withNormalizeCSS withGlobalStyles>
    <TypographyStylesProvider>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <Routing />
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </TypographyStylesProvider>
  </MantineProvider>
);

export default App;
