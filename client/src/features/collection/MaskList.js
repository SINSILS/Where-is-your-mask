import { Button, SimpleGrid, Text, Card, Title, Group, createStyles } from '@mantine/core';
import Image from 'shared/components/Image';
import { useState } from 'react';
import { CART_ITEM_TYPE, useCart } from 'core/cart';
import OrderMasksModal from 'shared/components/OrderMasksModal';
import { localImageSrc } from 'core/images';

const useStyles = createStyles((theme) => ({
  card: {
    padding: `0 ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px`,
  },
  cardTitle: {
    marginTop: '0 !important',
  },
}));

const MaskList = ({ masks }) => {
  const [selectedMaskToOrder, setSelectedMaskToOrder] = useState(null);

  const { add: addToCart } = useCart();

  const { classes } = useStyles();

  const handleAddToCart = ({ quantity }) => {
    addToCart(CART_ITEM_TYPE.collection, quantity, selectedMaskToOrder);
    setSelectedMaskToOrder(null);
  };

  return (
    <>
      <OrderMasksModal
        opened={!!selectedMaskToOrder}
        onClose={() => setSelectedMaskToOrder(null)}
        onAddToCart={handleAddToCart}
      />
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1300, cols: 3 },
          { maxWidth: 1000, cols: 2 },
          { maxWidth: 670, cols: 1 },
        ]}
      >
        {masks.map((x) => (
          <Card key={x.id} shadow="sm" className={classes.card}>
            <Card.Section>
              <Image src={localImageSrc(x.imageId)} alt={x.name} fit="cover" height={250} />
            </Card.Section>
            <Title weight={600} order={3} className={classes.cardTitle}>
              {x.name}
            </Title>
            <Text>{x.description}</Text>
            <Text>{x.price} €</Text>
            <Group position="center">
              <Button variant="light" fullWidth onClick={() => setSelectedMaskToOrder(x)}>
                Choose
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MaskList;
