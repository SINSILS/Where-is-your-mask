import { AppShell, Container, createStyles } from '@mantine/core';
import Header from 'features/layout/Header';
import Footer from 'features/layout/Footer';

const HEADER_HEIGHT = 60;

const useStyles = createStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
  },
});

const Layout = ({ children }) => {
  const { classes } = useStyles();

  return (
    <AppShell padding={0} fixed header={<Header height={HEADER_HEIGHT} />} classNames={{ main: classes.main }}>
      <Container size="xl" className={classes.container}>
        {children}
      </Container>
      <Footer />
    </AppShell>
  );
};

export default Layout;
