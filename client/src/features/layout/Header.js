import { ActionIcon, Container, createStyles, Header as HeaderWrapper } from '@mantine/core';
import { CartIcon } from 'theme/icons';
import { useCart } from 'core/cart';

const useStyles = createStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  cartContainer: {
    position: 'relative',
  },
  cartSize: {
    alignItems: 'center',
    backgroundColor: theme.colors.red[7],
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    fontSize: 12,
    fontWeight: 600,
    justifyContent: 'center',
    height: 16,
    position: 'absolute',
    top: -3,
    transition: 'background-color 100ms ease-in',
    right: -3,
    width: 16,
  },
  cartSizeNonEmpty: {
    backgroundColor: theme.colors.green[5],
  },
  cart: {
    height: 25,
    width: 25,
  },
}));

const Header = (props) => {
  const {
    items: { length: cartItemsCount },
  } = useCart();

  const { classes, cx } = useStyles();

  return (
    <HeaderWrapper padding="xs" {...props}>
      <Container size="xl" className={classes.container}>
        <span>Logo</span>
        <ActionIcon color="blue" size="lg" className={classes.cartContainer}>
          <span className={cx(classes.cartSize, cartItemsCount > 0 && classes.cartSizeNonEmpty)}>{cartItemsCount}</span>
          <CartIcon height={23} width={23} className={classes.cart} />
        </ActionIcon>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
