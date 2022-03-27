import {Space} from '@mantine/core';
import fabricMaskImg from 'theme/images/fabric-mask.jpg';
import medicalMaskImg from 'theme/images/medical-mask.jpg';
import birdsMaskImg from 'theme/images/birds-are-leaving.jpg';
import CollectionPreview from 'features/landing/CollectionPreview';

const CollectionList = () => (
    <>
      <CollectionPreview
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
      <Space h="xl" />
      <CollectionPreview
        collections={[
          {
            id: 1,
            name: 'Autumn Collection',
            description: 'Description Description Description Description Description',
            imageSrc: medicalMaskImg,
          },
          {
            id: 2,
            name: 'Valentine day Collection',
            description: 'Description Description Description Description Description',
            imageSrc: medicalMaskImg,
          },
          {
            id: 3,
            name: 'Summer Collection',
            description: 'Description Description Description Description Description',
            imageSrc: birdsMaskImg,
          },
          {
            id: 4,
            name: 'Autumn Collection',
            description: 'Description Description Description Description Description',
            imageSrc: medicalMaskImg,
          },
          {
            id: 5,
            name: 'Valentine day Collection',
            description: 'Description Description Description Description Description',
            imageSrc: birdsMaskImg,
          },
          {
            id: 6,
            name: 'Summer Collection',
            description: 'Description Description Description Description Description',
            imageSrc: birdsMaskImg,
          },
          {
            id: 7,
            name: 'Autumn Collection',
            description: 'Description Description Description Description Description',
            imageSrc: medicalMaskImg,
          },
          {
            id: 8,
            name: 'Autumn Collection',
            description: 'Description Description Description Description Description',
            imageSrc: medicalMaskImg,
          },
        ]}
      />
    </>
  );
  export default CollectionList;