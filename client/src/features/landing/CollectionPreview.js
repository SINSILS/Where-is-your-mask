import { Box, Button, createStyles, SimpleGrid, Space, Text } from '@mantine/core';
import Image from 'shared/Image';
import {Link} from 'react-router-dom';

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

const CollectionPreview = ({showButton, collections }) => {
  const { classes } = useStyles();

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
      {collections.map((x) => (
        <Button variant="light" key={x.id} className={classes.collectionBox} component={Link} to="Collection">
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
            src={x.imageSrc}
            alt={x.name}
            fit="cover"
            height={BOX_SIZE}
            className={classes.collectionImage}
            radius="md"
          />
        </Button>
      ))}
      {showButton && (
      <Button variant="light" className={classes.viewMoreBox} size="lg" component={Link} to="AllCollections">
        View more
      </Button>
      )}
    </SimpleGrid>
  );
};

export default CollectionPreview;
