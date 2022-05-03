import { Helmet } from 'react-helmet';
import { Space, Title } from '@mantine/core';
import CartItems from 'features/cart/CartItems';

const CartPage = () => (
  <>
    <Helmet>
      <title>Your cart - VELK</title>
    </Helmet>
    <Title order={2}>Your cart</Title>
    <Space h="md" />
    <CartItems />
  </>
);

export default CartPage;
