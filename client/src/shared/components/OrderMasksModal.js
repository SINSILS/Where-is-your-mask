import { Button, Group, Modal, NumberInput, Space } from '@mantine/core';

const OrderMasksModal = ({ opened, onClose, onAddToCart }) => (
  <Modal centered opened={opened} onClose={onClose} title="How many masks do you want to order?">
    <NumberInput label="Quantity" placeholder="Quantity" max={999} min={1} defaultValue={1} />
    <Space h="md" />
    <Group position="center">
      <Button variant="light" onClick={onAddToCart}>
        Add to cart!
      </Button>
    </Group>
  </Modal>
);

export default OrderMasksModal;
