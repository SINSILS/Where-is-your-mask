import { LoadingOverlay, MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { THEME } from 'theme/theme';
import Layout from 'features/layout/Layout';
import IndexPage from 'pages/IndexPage';
import FabricMaskModelingPage from 'pages/fabric/FabricMaskModelingPage';
import MedicalMaskModelingPage from 'pages/medical/MedicalMaskModelingPage';
import { CartProvider } from 'core/cart';
import CollectionPage from 'pages/collections/CollectionPage';
import LoginPage from 'pages/admin/LoginPage';
import CollectionListPage from 'pages/collections/CollectionListPage';
import { UserProvider, useUser } from 'core/user';
import ProtectedPage from 'core/ProtectedPage';
import ModelingConfigurationPage from 'pages/admin/ModelingConfigurationPage';
import AppQueryProvider from 'shared/api/query-client/AppQueryProvider';
import ModelReviewPage from 'pages/ModelReviewPage';
import CartPage from 'pages/CartPage';
import PaymentPage from 'pages/PaymentPage';
import OrdersListPage from 'pages/admin/OrdersListPage';
import OrderPage from 'pages/admin/OrderPage';

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
          <Route exact path="review" element={<ModelReviewPage />} />
          <Route exact path="cart" element={<CartPage />} />
          <Route exact path="payment" element={<PaymentPage />} />
          <Route path="admin">
            <Route index element={<Navigate to="/admin/login" />} />
            <Route exact path="login" element={isAdmin ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="orders">
              <Route index element={<OrdersListPage />} />
              <Route path=":orderId" element={<OrderPage />} />
            </Route>
            <Route
              exact
              path="configure"
              element={
                <ProtectedPage>
                  <ModelingConfigurationPage />
                </ProtectedPage>
              }
            />
          </Route>
          <Route path="fabric">
            <Route exact path="design" element={<FabricMaskModelingPage />} />
          </Route>
          <Route path="medical">
            <Route exact path="design" element={<MedicalMaskModelingPage />} />
          </Route>
          <Route path="collections">
            <Route exact index element={<CollectionListPage />} />
            <Route exact path=":collectionId" element={<CollectionPage />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};

const App = () => (
  <MantineProvider theme={THEME} withNormalizeCSS withGlobalStyles>
    <TypographyStylesProvider>
      <NotificationsProvider autoClose={4000} position="top-right">
        <ModalsProvider>
          <AppQueryProvider>
            <BrowserRouter>
              <UserProvider>
                <CartProvider>
                  <Routing />
                </CartProvider>
              </UserProvider>
            </BrowserRouter>
          </AppQueryProvider>
        </ModalsProvider>
      </NotificationsProvider>
    </TypographyStylesProvider>
  </MantineProvider>
);

export default App;
