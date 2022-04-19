import { Box, createStyles, Group } from '@mantine/core';
import Image from 'shared/components/Image';
import { localImageSrc } from 'core/images';
import { AddIcon } from 'theme/icons';

const stickerSize = 117;

const useStyles = createStyles((theme, _params, getRef) => {
  const stickerOverlay = getRef('stickerOverlay');

  return {
    group: {
      overflowX: 'scroll',
    },
    sticker: {
      minWidth: stickerSize,
      cursor: 'pointer',
      position: 'relative',

      [`&:hover .${stickerOverlay}`]: {
        opacity: 1,
      },
    },
    stickerOverlay: {
      ref: stickerOverlay,
      position: 'absolute',
      boxSizing: 'border-box',
      inset: 0,
      opacity: 0,
      zIndex: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: theme.spacing.lg,
      borderRadius: theme.radius.md,
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addIcon: {
      '& > path': {
        fill: theme.colors.indigo[4],
      },
    },
  };
});

const StickersGroup = ({ stickers, onChooseSticker }) => {
  const { classes } = useStyles();

  return (
    <Group className={classes.group} direction="row" noWrap>
      {stickers.map((imageId, index) => (
        <Box key={imageId} className={classes.sticker} onClick={() => onChooseSticker(imageId)}>
          <Image
            src={localImageSrc(imageId)}
            alt={`Sticker ${index + 1}`}
            height={stickerSize}
            width={stickerSize}
            radius="md"
          />
          <Box className={classes.stickerOverlay}>
            <AddIcon size={80} className={classes.addIcon} />
          </Box>
        </Box>
      ))}
    </Group>
  );
};

export default StickersGroup;
