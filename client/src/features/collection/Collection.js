import { Button, Card, createStyles, Image, Space, Text, Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles({
  card: {
    width: 400,
    maxWidth: '100%',
    textDecoration: 'none !important',
  },
  image: {
    width: '100%',
  },
});


const Collection =  ({ imgSrc, title, description, modelingLink }) => {
  const { classes } = useStyles();

  return (
    <Card shadow="sm" padding="lg" component={NavLink} className={classes.card} to={modelingLink}>
      <Card.Section>
        <Image src={imgSrc} alt={title} fit="contain" height={250} className={classes.image} />
      </Card.Section>
      <Title weight={600} order={3}>
        {title}
      </Title>
      <Text>{description}</Text>
      <Space h="sm" />
      <Button variant="light" fullWidth>
        Choose
      </Button>
    </Card>
  );
};
export default Collection;