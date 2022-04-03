import fabricMaskImg from 'theme/images/fabric-mask.jpg';
import birdsMaskImg from 'theme/images/birds-are-leaving.jpg';
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
    <CollectionsList
      collections={[
        {
          id: 1,
          name: 'Holiday Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 2,
          name: 'Valentine day Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 3,
          name: 'Winter Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 4,
          name: 'Holiday Collection',
          description: 'Description Description Description Description Description',
          imageSrc: birdsMaskImg,
        },
        {
          id: 5,
          name: 'Valentine day Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 6,
          name: 'Winter Collection',
          description: 'Description Description Description Description Description',
          imageSrc: birdsMaskImg,
        },
        {
          id: 7,
          name: 'Winter Collection',
          description: 'Description Description Description Description Description',
          imageSrc: birdsMaskImg,
        },
        {
          id: 8,
          name: 'Winter Collection',
          description: 'Description Description Description Description Description',
          imageSrc: birdsMaskImg,
        },
      ]}
    />
  </>
);

export default CollectionListPage;
