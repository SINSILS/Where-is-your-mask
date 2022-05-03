import { Helmet } from 'react-helmet';
import { Space, Title } from '@mantine/core';
import CartItems from 'features/cart/CartItems';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Your cart - VELK</title>
      </Helmet>
      <Title order={2}>Your cart</Title>
      <Space h="md" />
      <CartItems onActionButtonClick={() => navigate('/payment')} />
    </>
  );
};

export default CartPage;
