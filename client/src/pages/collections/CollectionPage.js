import { Button, createStyles, LoadingOverlay, Space, Text, Title } from '@mantine/core';
import MaskList from 'features/collection/MaskList';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import useCollectionQuery from 'shared/api/collections/useCollectionQuery';
import { useUser } from 'core/user';
import { useState } from 'react';
import CreateMaskModal from 'features/collection/CreateMaskModal';
import useMutateCreateMask from 'shared/api/collections/useMutateCreateMask';
import useNotification from 'core/notification';

const useStyles = createStyles({
  title: {
    margin: '0 !important',
  },
});

const CollectionPage = () => {
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { collectionId } = useParams();

  const { isAdmin } = useUser();

  const [isCreateMaskModalOpen, setIsCreateMaskModalOpen] = useState(false);

  const { data: collection, isLoading } = useCollectionQuery(collectionId);
  const createMaskMutation = useMutateCreateMask({
    onSuccess: () => {
      setIsCreateMaskModalOpen(false);
      showSuccessNotification({ message: 'New mask added successfully' });
    },
    onError: () => {
      showErrorNotification({ message: 'Failed to add a new mask' });
    },
  });

  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>{collection?.name ?? ''} Collection - VELK</title>
      </Helmet>
      <LoadingOverlay visible={isLoading} />
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
              <Button variant="light" onClick={() => setIsCreateMaskModalOpen(true)}>
                Create a mask
              </Button>
              <Space h="xl" />
              <CreateMaskModal
                opened={isCreateMaskModalOpen}
                onSubmit={(mask) => createMaskMutation.mutate({ collectionId, mask })}
                onClose={() => setIsCreateMaskModalOpen(false)}
                loading={createMaskMutation.isLoading}
              />
            </>
          )}
          <MaskList masks={collection.masks} />
        </>
      )}
    </>
  );
};

export default CollectionPage;
