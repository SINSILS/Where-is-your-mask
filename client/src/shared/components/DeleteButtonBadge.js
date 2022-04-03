import { CloseIcon } from 'theme/icons';
import { Button, createStyles } from '@mantine/core';

const useStyles = createStyles({
  button: {
    position: 'absolute',
    right: -5,
    top: -5,
    padding: 0,
    height: 16,
    width: 16,
    zIndex: 2,

    '& svg': {
      height: 20,
      width: 20,
    },
  },
});

const DeleteButtonBadge = ({ onClick }) => {
  const { classes } = useStyles();

  return (
    <Button variant="default" className={classes.button} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
};

export default DeleteButtonBadge;
