import CollectionsList from 'shared/components/CollectionsList';
import { Helmet } from 'react-helmet';
import { Space, Title } from '@mantine/core';

const CollectionListPage = () => (
  <>
    <Helmet>
      <title>Choose from our collections - VELK</title>
    </Helmet>
    <Title order={2}>Our collections</Title>
    <Space h="md" />
    <CollectionsList />
  </>
);

export default CollectionListPage;
