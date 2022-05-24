import { Helmet } from 'react-helmet';
import { Box, createStyles, Group, LoadingOverlay, Table, Text, Title } from '@mantine/core';
import useOrderQuery from 'shared/api/orders/useOrderQuery';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Select } from '@mantine/core';
import { ORDER_STATUS, ORDER_STATUS_LABEL } from 'core/orderStatus';
import { CART_ITEM_TYPE } from 'core/cart';
import Image from 'shared/components/Image';
import { localImageSrc } from 'core/images';
import useMutateOrderStatus from 'shared/api/orders/useMutateOrderStatus';

const IMAGE_SIZE = 250;

const useStyles = createStyles({
  imagesWrapper: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  image: {
    minHeight: IMAGE_SIZE,
    minWidth: IMAGE_SIZE,
  },
});

const OrderPage = () => {
  const { orderId } = useParams();

  const { data: order, isLoading } = useOrderQuery(orderId);
  const orderStatusMutation = useMutateOrderStatus();

  const { classes } = useStyles();

  const renderMaskImage = (imageId) => (
    <div key={imageId} className={classes.image}>
      <Image src={localImageSrc(imageId)} alt="Mask image" height={IMAGE_SIZE} width={IMAGE_SIZE} />
    </div>
  );

  const shippingInformationLabels = [
    {
      label: 'First Name',
      key: 'firstName',
    },
    {
      label: 'Last Name',
      key: 'lastName',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Country',
      key: 'country',
    },
    {
      label: 'City',
      key: 'city',
    },
    {
      label: 'Shipping Address',
      key: 'shippingAddress',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Order - VELK</title>
      </Helmet>
      <LoadingOverlay visible={isLoading} />
      {order && (
        <>
          <Title order={2}>Order {format(parseISO(order.date), 'PP')}</Title>
          <Group spacing="xl">
            <Box>
              <Text size="lg">Order status</Text>
              <Select
                defaultValue={order.status.toString()}
                onChange={(newStatus) => orderStatusMutation.mutate({ id: order.id, status: newStatus })}
                data={Object.values(ORDER_STATUS).map((status) => ({
                  value: status.toString(),
                  label: ORDER_STATUS_LABEL[status],
                }))}
              />
            </Box>
            <Box>
              <Text size="lg">Ordered quantity</Text>
              <Text size="xl" weight={600}>
                {order.order.reduce((acc, x) => acc + x.quantity, 0)}
              </Text>
            </Box>
            <Box>
              <Text size="lg">Order price</Text>
              <Text size="xl" weight={600}>
                {order.order.map((x) => x.item.price * x.quantity).reduce((x, y) => x + y)} €
              </Text>
            </Box>
          </Group>
          <Title order={3}>Shipping information</Title>
          <Table horizontalSpacing="lg" verticalSpacing="lg" fontSize="lg">
            <tbody>
              {shippingInformationLabels.map(({ key, label }) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{order.shippingInformation[key]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Title order={3}>Order items</Title>
          <Table horizontalSpacing="lg" verticalSpacing="lg" fontSize="lg">
            <thead>
              <tr>
                <th />
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.order.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Group className={classes.imagesWrapper} direction="row" noWrap>
                      {item.type === CART_ITEM_TYPE.custom ? (
                        <>{item.item.imageIds.map(renderMaskImage)}</>
                      ) : (
                        renderMaskImage(item.item.imageId)
                      )}
                    </Group>
                  </td>
                  <td>{item.type === CART_ITEM_TYPE.custom ? 'Custom mask' : item.item.name}</td>
                  <td>{item.item.price} €</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.item.price} €</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrderPage;
