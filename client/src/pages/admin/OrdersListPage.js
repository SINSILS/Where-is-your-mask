import { Helmet } from 'react-helmet';
import { createStyles, LoadingOverlay, Space, Table, Title } from '@mantine/core';
import { format, parseISO } from 'date-fns';
import useOrdersQuery from 'shared/api/orders/useOrdersQuery';
import { ORDER_STATUS_LABEL } from 'core/orderStatus';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles({
  row: {
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const OrdersListPage = () => {
  const navigate = useNavigate();

  const { data: orders, isLoading } = useOrdersQuery();

  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Orders - VELK</title>
      </Helmet>
      <Title order={2}>Orders</Title>
      <Space h="md" />
      <LoadingOverlay visible={isLoading} />
      {orders && (
        <Table horizontalSpacing="lg" verticalSpacing="lg" fontSize="lg">
          <thead>
            <tr>
              <th>Status</th>
              <th>Order Date</th>
              <th>Total No. of Masks</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className={classes.row} onClick={() => navigate(`/admin/orders/${o.id}`)}>
                <td>{ORDER_STATUS_LABEL[o.status]}</td>
                <td>{format(parseISO(o.date), 'PP')}</td>
                <td>{o.order.reduce((acc, x) => acc + x.quantity, 0)}</td>
                <td>{o.order.map((x) => x.item.price * x.quantity).reduce((x, y) => x + y)} €</td>
              </tr>
            ))}
          </tbody>
          <caption>{orders.length === 0 && 'There are no orders'}</caption>
        </Table>
      )}
    </>
  );
};

export default OrdersListPage;
