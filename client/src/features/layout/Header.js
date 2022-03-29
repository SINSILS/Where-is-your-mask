import { ActionIcon, Anchor, Container, createStyles, Group, Header as HeaderWrapper } from '@mantine/core';
import { CartIcon, SignOutIcon } from 'theme/icons';
import { useCart } from 'core/cart';
import { useUser } from 'core/user';
import Image from 'shared/Image';
import logoImage from 'theme/images/logo.png';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  logoLink: {
    marginRight: theme.spacing.lg,
  },
  logo: {
    '& img': {
      marginBottom: 0,
    },
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
  icon: {
    height: 25,
    width: 25,
  },
}));

const Header = (props) => {
  const {
    items: { length: cartItemsCount },
  } = useCart();

  const { isAdmin, logout } = useUser();

  const { classes, cx } = useStyles();

  return (
    <HeaderWrapper padding="xs" {...props}>
      <Container size="xl" className={classes.container}>
        <Group>
          <NavLink to="/" className={classes.logoLink}>
            <Image src={logoImage} alt="Logo" height={40} radius="sm" className={classes.logo} />
          </NavLink>
          <Anchor component={NavLink} to="/collections">
            Collections
          </Anchor>
        </Group>
        <Group>
          <ActionIcon color="blue" size="lg" className={classes.cartContainer}>
            <span className={cx(classes.cartSize, cartItemsCount > 0 && classes.cartSizeNonEmpty)}>
              {cartItemsCount}
            </span>
            <CartIcon height={23} width={23} className={classes.icon} />
          </ActionIcon>
          {isAdmin && (
            <ActionIcon color="blue" size="lg" onClick={logout}>
              <SignOutIcon className={classes.icon} />
            </ActionIcon>
          )}
        </Group>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
