import { Box, Button, createStyles, LoadingOverlay, SimpleGrid, Space, Text } from '@mantine/core';
import Image from 'shared/components/Image';
import { Link } from 'react-router-dom';
import useCollectionsQuery from 'shared/api/collections/useCollectionsQuery';
import CreateCollectionModal from 'features/collection/CreateCollectionModal';
import useMutateCreateCollection from 'shared/api/collections/useMutateCreateCollection';
import { useState } from 'react';
import { useUser } from 'core/user';
import { localImageSrc } from 'core/images';

const BOX_SIZE = 250;
const BORDER_SIZE = 2;

const useStyles = createStyles((theme, _params, getRef) => {
  const collectionOverlay = getRef('collectionOverlay');

  return {
    collectionBox: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      border: `${BORDER_SIZE}px solid ${theme.colors.gray[3]}`,
      borderRadius: theme.radius.md,
      position: 'relative',
      height: BOX_SIZE,
      minWidth: 300,
      padding: 0,
      transition: 'border 100ms ease-in',

      '*': {
        borderRadius: theme.radius.md - 2,
        width: '100%',
      },

      '&:hover': {
        border: `${BORDER_SIZE}px solid rgba(0, 0, 0, 0.6)`,
      },

      [`&:hover .${collectionOverlay}`]: {
        opacity: 1,
      },
    },
    collectionOverlay: {
      ref: collectionOverlay,
      position: 'absolute',
      boxSizing: 'border-box',
      inset: 0,
      opacity: 0,
      zIndex: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: theme.spacing.lg,
      transition: 'opacity 100ms ease-in',
      borderRadius: theme.radius.md - 3,

      '& > *': {
        whiteSpace: 'normal',
        textAlign: 'left',
      },
    },
    collectionImage: {
      borderRadius: theme.radius.md,

      img: {
        marginBottom: 0,
      },
    },
    collectionDescription: {
      lineHeight: 1,
    },
    viewMoreBox: {
      alignItems: 'center',
      border: `${BORDER_SIZE}px solid ${theme.colors.indigo[1]}`,
      borderRadius: theme.radius.md,
      backgroundColor: 'rgba(237, 242, 255, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      height: BOX_SIZE,
      minWidth: BOX_SIZE,

      '& > div': {
        color: theme.colors.indigo[3],
        textAlign: 'center',
        width: '80%',

        '& > span': {
          whiteSpace: 'normal',
        },
      },
    },
  };
});

const CollectionsList = ({ preview }) => {
  const { isAdmin } = useUser();

  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);

  const { data: collections = [], isLoading } = useCollectionsQuery();
  const createCollectionMutation = useMutateCreateCollection({
    onSuccess: () => setIsCreateCollectionModalOpen(false),
  });

  const { classes } = useStyles();

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <CreateCollectionModal
        opened={isCreateCollectionModalOpen}
        loading={createCollectionMutation.isLoading}
        onClose={() => setIsCreateCollectionModalOpen(false)}
        onSubmit={createCollectionMutation.mutate}
      />
      {isAdmin && !preview && (
        <>
          <Button variant="light" onClick={() => setIsCreateCollectionModalOpen(true)}>
            Create a collection
          </Button>
          <Space h="xl" />
        </>
      )}
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1300, cols: 3 },
          { maxWidth: 1000, cols: 2 },
          { maxWidth: 670, cols: 1 },
        ]}
      >
        {(preview ? collections.slice(0, 7) : collections).map((x) => (
          <Button
            variant="light"
            key={x.id}
            className={classes.collectionBox}
            component={Link}
            to={`/collections/${x.id}`}
          >
            <Box className={classes.collectionOverlay}>
              <Text color="white" weight={600} size="xl">
                {x.name}
              </Text>
              <Space h="lg" />
              <Text color="white" weight={500} size="md" className={classes.collectionDescription}>
                {x.description}
              </Text>
            </Box>
            <Image
              src={localImageSrc(x.imageId)}
              alt={x.name}
              fit="cover"
              height={BOX_SIZE}
              className={classes.collectionImage}
              radius="md"
            />
          </Button>
        ))}
        {preview && (
          <Button variant="light" className={classes.viewMoreBox} size="lg" component={Link} to="/collections">
            View more
          </Button>
        )}
      </SimpleGrid>
    </>
  );
};

export default CollectionsList;
