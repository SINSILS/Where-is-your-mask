import { Button, SimpleGrid, Text, Card, Title, Group, createStyles } from '@mantine/core';
import Image from 'shared/components/Image';
import { useState } from 'react';
import { useCart } from 'core/cart';
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
  const [opened, setOpened] = useState(false);

  const { add: addToCart } = useCart();

  const { classes } = useStyles();

  return (
    <>
      <OrderMasksModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAddToCart={() => {
          addToCart({});
          setOpened(false);
        }}
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
              <Image src={localImageSrc(x.imageId)} alt={x.name} fit="contain" height={250} />
            </Card.Section>
            <Title weight={600} order={3} className={classes.cardTitle}>
              {x.name}
            </Title>
            <Text>{x.description}</Text>
            <Text>{x.price} €</Text>
            <Group position="center">
              <Button variant="light" fullWidth onClick={() => setOpened(true)}>
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
