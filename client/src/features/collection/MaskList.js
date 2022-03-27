import { Button, SimpleGrid, Text, Card, Title, Modal, Group, NumberInput, Space} from '@mantine/core';
import Image from 'shared/Image';
import { useState } from 'react';
import { useCart } from 'core/cart';


const MaskList = ({ type, masks }) => {
const [opened, setOpened] = useState(false);
const {
    add: addToCart
  } = useCart();
  return (
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
        <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image src={x.imageSrc} alt={x.name} fit="contain" height={250} />
        </Card.Section>
        <Title weight={600} order={3}>
          {x.name}
        </Title>
        <Text>{x.description}</Text>
        <Text>{x.price} €</Text>
        <>
      <Modal overlayOpacity={0.35}
        opened={opened}
        onClose={() => setOpened(false)}
        title="How many masks do you want to order?"
      >
        <NumberInput
        label="Quantity"
        placeholder="Quantity"
        max={999}
        min={1}
        defaultValue={1}
        
      /> 
      <Space h="md" />
      <Group position="center">
        <Button variant="light"  onClick={() => {addToCart({}); setOpened(false)}}  >Add to cart!</Button>
      </Group>
      </Modal>

      <Group position="center">
        <Button variant="light" fullWidth onClick={() => setOpened(true)}>Choose</Button>
      </Group>
    </>

      </Card>
      
      ))}
    </SimpleGrid>
  );
};

export default MaskList;
