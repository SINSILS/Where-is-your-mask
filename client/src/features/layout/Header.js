import { ActionIcon, Container, createStyles, Header as HeaderWrapper } from '@mantine/core';
import { CartIcon } from 'theme/icons';

const useStyles = createStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  cart: {
    height: 25,
    width: 25,
  },
});

const Header = (props) => {
  const { classes } = useStyles();

  return (
    <HeaderWrapper padding="xs" {...props}>
      <Container size="xl" className={classes.container}>
        <span>Logo</span>
        <ActionIcon color="blue" size="lg">
          <CartIcon height={23} width={23} className={classes.cart} />
        </ActionIcon>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
