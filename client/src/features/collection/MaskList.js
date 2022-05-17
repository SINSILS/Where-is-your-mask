import { Button, SimpleGrid, Text, Card, Title, Group, createStyles } from '@mantine/core';
import Image from 'shared/components/Image';
import { useState } from 'react';
import { CART_ITEM_TYPE, useCart } from 'core/cart';
import OrderMasksModal from 'shared/components/OrderMasksModal';
import { localImageSrc } from 'core/images';
import { useModals } from '@mantine/modals';
import { useUser } from 'core/user';
import useNotification from 'core/notification';
import useMutateDeleteMask from 'shared/api/collections/useMutateDeleteMask';
import useMutateUpdateMask from 'shared/api/collections/useMutateUpdateMask';
import CreateMaskModal from 'features/collection/CreateMaskModal';

const useStyles = createStyles((theme) => ({
  card: {
    padding: `0 ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px`,
  },
  cardTitle: {
    marginTop: '0 !important',
  },
}));

const MaskList = ({ masks, collectionId }) => {
  const [selectedMaskToOrder, setSelectedMaskToOrder] = useState(null);

  const { showSuccessNotification, showErrorNotification } = useNotification();
  const modals = useModals();

  const { isAdmin } = useUser();

  const [maskToUpdate, setMaskToUpdate] = useState(null);

  const { add: addToCart } = useCart();

  const { classes } = useStyles();

  const updateMaskMutation = useMutateUpdateMask({
    onSuccess: () => {
      setMaskToUpdate(null);
      showSuccessNotification({ message: 'Mask updated successfully' });
    },
    onError: () => showErrorNotification({ message: 'Failed to update the mask' }),
  });

  const deleteMaskMutation = useMutateDeleteMask({
    onError: () => showErrorNotification({ message: 'Failed to delete the mask' }),
  });

  const handleAddToCart = ({ quantity }) => {
    addToCart(CART_ITEM_TYPE.collection, quantity, selectedMaskToOrder);
    setSelectedMaskToOrder(null);
  };

  const handleOpenDeletionConfirmationModal = (maskId) =>
    modals.openConfirmModal({
      title: 'Delete this mask?',
      children: <Text size="sm">Are you sure you want to delete this mask?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteMaskMutation.mutate({ collectionId, maskId }),
    });

  return (
    <>
      <OrderMasksModal
        opened={!!selectedMaskToOrder}
        onClose={() => setSelectedMaskToOrder(null)}
        onAddToCart={handleAddToCart}
      />
      <CreateMaskModal
        opened={!!maskToUpdate}
        initialMask={maskToUpdate}
        loading={updateMaskMutation.isLoading}
        onClose={() => setMaskToUpdate(null)}
        onSubmit={(mask) => updateMaskMutation.mutate({ collectionId, maskId: maskToUpdate.id, mask })}
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
            <Group position="center" spacing="xs">
              <Button variant="light" fullWidth onClick={() => setSelectedMaskToOrder(x)}>
                Choose
              </Button>
              {isAdmin && (
                <Button variant="default" fullWidth onClick={() => setMaskToUpdate(x)}>
                  Update Mask
                </Button>
              )}
              {isAdmin && (
                <Button variant="default" fullWidth onClick={() => handleOpenDeletionConfirmationModal(x.id)}>
                  Delete Mask
                </Button>
              )}
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MaskList;
