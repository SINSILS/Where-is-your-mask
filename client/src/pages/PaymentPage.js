import { Helmet } from 'react-helmet';
import { Anchor, Group, Space, Stepper, Text } from '@mantine/core';
import { useState } from 'react';
import CartItems from 'features/cart/CartItems';
import PaymentForm from 'features/payment/PaymentForm';
import { NavLink } from 'react-router-dom';
import { SuccessIcon } from 'theme/icons';
import { useCart } from 'core/cart';

const PaymentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { clear: clearCart } = useCart();

  const handleSubmit = () => {
    setIsSuccessful(true)
    clearCart();
  };

  return (
    <>
      <Helmet>
        <title>Payment - VELK</title>
      </Helmet>
      <Space h="xl" />
      {isSuccessful ? (
        <Group direction="column" align="center" spacing="xs">
          <Space h="xl" />
          <Space h="xl" />
          <Space h="xl" />
          <SuccessIcon size={120} />
          <Space h="sm" />
          <Text size="lg">Order submitted successfully.</Text>
          <Anchor size="lg" component={NavLink} to="/">
            Go to home page.
          </Anchor>
        </Group>
      ) : (
        <Stepper active={activeStep} onStepClick={setActiveStep} size="sm">
          <Stepper.Step label="Cart" description="Review your cart">
            <CartItems onActionButtonClick={() => setActiveStep(1)} actionButtonText="Continue" />
          </Stepper.Step>
          <Stepper.Step label="Pay" description="Payment information">
            <PaymentForm onGoBackToCart={() => setActiveStep(0)} onSubmit={handleSubmit} />
          </Stepper.Step>
        </Stepper>
      )}
    </>
  );
};

export default PaymentPage;
