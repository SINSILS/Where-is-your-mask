import { Box, Container, createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.gray[8],
    marginTop: theme.spacing.xl * 2,
    boxSizing: 'border-box',
    padding: `${theme.spacing.sm}px 0`,
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <Text weight={600} color="white" size="md">
          Where is your mask?
        </Text>
        <Text weight={500} color="white" size="xs">
          Copyright © 2022
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
