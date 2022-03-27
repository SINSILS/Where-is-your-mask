import { Divider, Group, Space, Title } from '@mantine/core';
import nightMaskImg from 'theme/images/longer-nights.jpg';
import birdsMaskImg from 'theme/images/birds-are-leaving.jpg';
import MaskList from 'features/collection/MaskList';

const CollectionPage = () => (
  <>
    <Title order={2}>Choose an autumn mask, that fits you best</Title>
    <Space h="md" />
    <MaskList
      type="Fabric Masks"
      masks={[
        {
          id: 1,
          name: 'Birds are leaving',
          description: 'Good mask :)',
          imageSrc: birdsMaskImg,
          price: 10
        },
        {
          id: 2,
          name: 'Longer nights',
          description: 'Perfect mask :)',
          imageSrc: nightMaskImg,
          price: 10
        },
        {
          id: 3,
          name: 'Longer nights',
          description: 'Awesome mask :)',
          imageSrc: nightMaskImg,
          price: 10
        },
      ]}
    />
    <Space h="xl" />
    <Divider />

  </>
);

export default CollectionPage;
