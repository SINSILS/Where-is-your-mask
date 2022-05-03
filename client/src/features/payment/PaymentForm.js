import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { Button, createStyles, Group, Space, TextInput } from '@mantine/core';

const SCHEMA = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  shippingAddress: yup.string().required('Shipping address is required'),
});

const useStyles = createStyles({
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

const PaymentForm = ({ onSubmit, onGoBackToCart }) => {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      city: '',
      shippingAddress: '',
    },
    schema: yupResolver(SCHEMA),
  });

  const { classes } = useStyles();

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className={classes.form}>
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Group direction="row" grow>
        <TextInput placeholder="First Name" {...form.getInputProps('firstName')} />
        <TextInput placeholder="Last Name" {...form.getInputProps('lastName')} />
      </Group>
      <Space h="lg" />
      <TextInput placeholder="Email" {...form.getInputProps('email')} />
      <Space h="lg" />
      <Group direction="row" grow>
        <TextInput placeholder="Country" {...form.getInputProps('country')} />
        <TextInput placeholder="City" {...form.getInputProps('city')} />
      </Group>
      <Space h="lg" />
      <TextInput placeholder="Shipping Address" {...form.getInputProps('shippingAddress')} />
      <Space h="lg" />
      <Group position="right">
        <Button type="button" onClick={onGoBackToCart} variant="outline">
          Back to cart
        </Button>
        <Button type="submit">Submit order</Button>
      </Group>
    </form>
  );
};

export default PaymentForm;
