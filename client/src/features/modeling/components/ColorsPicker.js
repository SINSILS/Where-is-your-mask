import { Box, ColorSwatch, createStyles, Group, Text } from '@mantine/core';
import DeleteButtonBadge from 'shared/components/DeleteButtonBadge';

const useStyles = createStyles({
  wrapper: {
    flex: 1,
  },
  swatchWrapper: {
    position: 'relative',
  },
  swatchClickable: {
    cursor: 'pointer',
  },
});

const ColorsPicker = ({ colors, onColorRemove, onColorSelect }) => {
  const { classes, cx } = useStyles();

  return (
    <Group position="center" spacing="xs" className={classes.wrapper}>
      {colors.length > 0 ? (
        colors.map((color) => (
          <Box key={color} className={classes.swatchWrapper}>
            <ColorSwatch
              color={color}
              radius={4}
              className={cx(onColorSelect && classes.swatchClickable)}
              onClick={onColorSelect}
            />
            {onColorRemove && (
              <DeleteButtonBadge onClick={() => onColorRemove(color)} />
            )}
          </Box>
        ))
      ) : (
        <Text>No colors exist</Text>
      )}
    </Group>
  );
};

export default ColorsPicker;
