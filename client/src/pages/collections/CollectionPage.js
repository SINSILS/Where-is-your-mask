import { Button, createStyles, Group, LoadingOverlay, Space, Text, Title } from '@mantine/core';
import MaskList from 'features/collection/MaskList';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import useCollectionQuery from 'shared/api/collections/useCollectionQuery';
import { useUser } from 'core/user';
import { useState } from 'react';
import CreateMaskModal from 'features/collection/CreateMaskModal';
import useMutateCreateMask from 'shared/api/collections/useMutateCreateMask';
import useNotification from 'core/notification';
import useMutateDeleteCollection from 'shared/api/collections/useMutateDeleteCollection';
import { useModals } from '@mantine/modals';
import CreateCollectionModal from 'features/collection/CreateCollectionModal';
import useMutateUpdateCollection from 'shared/api/collections/useMutateUpdateCollection';

const useStyles = createStyles({
  title: {
    margin: '0 !important',
  },
});

const CollectionPage = () => {
  const navigate = useNavigate();

  const { showSuccessNotification, showErrorNotification } = useNotification();
  const modals = useModals();

  const { collectionId } = useParams();

  const { isAdmin } = useUser();

  const [isCreateMaskModalOpen, setIsCreateMaskModalOpen] = useState(false);
  const [isUpdateCollectionModalOpen, setIsUpdateCollectionModalOpen] = useState(false);

  const { data: collection, isLoading } = useCollectionQuery(collectionId);

  const updateCollectionMutation = useMutateUpdateCollection({
    onSuccess: () => {
      setIsUpdateCollectionModalOpen(false);
      showSuccessNotification({ message: 'Collection updated successfully' });
    },
    onError: () => showErrorNotification({ message: 'Failed to update the collection' }),
  });

  const deleteCollectionMutation = useMutateDeleteCollection({
    onSuccess: () => navigate('/collections'),
    onError: () => showErrorNotification({ message: 'Failed to delete the collection' }),
  });

  const createMaskMutation = useMutateCreateMask({
    onSuccess: () => {
      setIsCreateMaskModalOpen(false);
      showSuccessNotification({ message: 'New mask added successfully' });
    },
    onError: () => showErrorNotification({ message: 'Failed to add a new mask' }),
  });

  const handleOpenDeletionConfirmationModal = () =>
    modals.openConfirmModal({
      title: 'Delete this collection?',
      children: <Text size="sm">Are you sure you want to delete this collection?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteCollectionMutation.mutate(collectionId),
    });

  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>{collection?.name ?? ''} Collection - VELK</title>
      </Helmet>
      <LoadingOverlay visible={isLoading} />
      {isUpdateCollectionModalOpen && collection && (
        <CreateCollectionModal
          initialCollection={collection}
          onSubmit={(updatedCollection) =>
            updateCollectionMutation.mutate({ id: collectionId, collection: updatedCollection })
          }
          onClose={() => setIsUpdateCollectionModalOpen(false)}
          loading={updateCollectionMutation.isLoading}
          opened={isUpdateCollectionModalOpen}
        />
      )}
      {collection && (
        <>
          <Space h="xl" />
          <Title order={2} className={classes.title}>
            {collection.name}
          </Title>
          <Space h="xs" />
          <Text className={classes.title}>{collection.description}</Text>
          <Space h="md" />
          {isAdmin && (
            <>
              <Group>
                <Button variant="light" onClick={() => setIsCreateMaskModalOpen(true)}>
                  Create a mask
                </Button>
                <Button variant="default" onClick={handleOpenDeletionConfirmationModal}>
                  Delete collection
                </Button>
              </Group>
              <Space h="xl" />
              <CreateMaskModal
                opened={isCreateMaskModalOpen}
                onSubmit={(mask) => createMaskMutation.mutate({ collectionId, mask })}
                onClose={() => setIsCreateMaskModalOpen(false)}
                loading={createMaskMutation.isLoading}
              />
            </>
          )}
          <MaskList masks={collection.masks} collectionId={collection.id} />
        </>
      )}
    </>
  );
};

export default CollectionPage;
