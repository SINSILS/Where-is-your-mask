import { Button, Group, Modal, Space } from '@mantine/core';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import QuantityInput from 'shared/components/inputs/QuantityInput';

const OrderMasksModal = ({ opened, onClose, onAddToCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = () =>
    onAddToCart({
      quantity: selectedQuantity,
    });

  useUpdateEffect(() => {
    if (opened) {
      setSelectedQuantity(1);
    }
  }, [opened]);

  return (
    <Modal centered opened={opened} onClose={onClose} title="How many masks do you want to order?">
      <QuantityInput label="Quantity" value={selectedQuantity} onChange={setSelectedQuantity} />
      <Space h="md" />
      <Group position="center">
        <Button variant="light" onClick={handleAddToCart}>
          Add to cart!
        </Button>
      </Group>
    </Modal>
  );
};

export default OrderMasksModal;
