import { Divider, Group, Space, Title } from '@mantine/core';
import nightMaskImg from 'theme/images/longer-nights.jpg';
import birdsMaskImg from 'theme/images/birds-are-leaving.jpg';
import CollectionPreviewCart from 'features/collection/CollectionPreviewCart';

const CollectionPage = () => (
  <>
    <Title order={2}>Choose an autumn mask, that fits you best</Title>
    <Space h="md" />
    <CollectionPreviewCart
      type="Fabric Masks"
      collections={[
        {
          id: 1,
          name: 'Birds are leaving',
          description: 'Price: 10€',
          imageSrc: birdsMaskImg,
        },
        {
          id: 2,
          name: 'Longer nights',
          description: 'Price: 10€',
          imageSrc: nightMaskImg,
        },
      ]}
    />
    <Space h="xl" />
    <Divider />

  </>
);

export default CollectionPage;
