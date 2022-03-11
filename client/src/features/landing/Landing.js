import { Divider, Group, Space, Title } from '@mantine/core';
import fabricMaskImg from 'theme/images/fabric-mask.jpg';
import medicalMaskImg from 'theme/images/medical-mask.jpg';
import MaskTypeCard from 'features/landing/MaskTypeCard';
import CollectionPreview from 'features/landing/CollectionPreview';

const Landing = () => (
  <>
    <Title order={2}>Select a face mask to customize</Title>
    <Space h="md" />
    <Group align="center" position="center" spacing="xl">
      <MaskTypeCard
        title="Fabric Mask"
        description="Reusable and durable yet less effective mask"
        imgSrc={fabricMaskImg}
        modelingLink="/fabric/design"
      />
      <MaskTypeCard
        title="Medical Mask"
        description="Protectiveness over convenience"
        imgSrc={medicalMaskImg}
        modelingLink="/medical/design"
      />
    </Group>
    <Space h="xl" />
    <Title order={2}>Choose from our collections</Title>
    <Space h="md" />
    <CollectionPreview
      type="Fabric Masks"
      collections={[
        {
          id: 1,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 2,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 3,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 4,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 5,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 6,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
        {
          id: 7,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: fabricMaskImg,
        },
      ]}
    />
    <Space h="xl" />
    <Divider />
    <Space h="xl" />
    <CollectionPreview
      type="Medical Masks"
      collections={[
        {
          id: 1,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
        {
          id: 2,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
        {
          id: 3,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
        {
          id: 4,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
        {
          id: 5,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
        {
          id: 6,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
        {
          id: 7,
          name: 'Autumn Collection',
          description: 'Description Description Description Description Description',
          imageSrc: medicalMaskImg,
        },
      ]}
    />
  </>
);

export default Landing;
