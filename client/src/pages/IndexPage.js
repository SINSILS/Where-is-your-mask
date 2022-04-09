import { Helmet } from 'react-helmet';
import { Group, Space, Title } from '@mantine/core';
import MaskTypeCard from 'features/landing/MaskTypeCard';
import fabricMaskImg from 'theme/images/fabric-mask.jpg';
import medicalMaskImg from 'theme/images/medical-mask.jpg';
import CollectionsList from 'shared/components/CollectionsList';

const IndexPage = () => (
  <>
    <Helmet>
      <title>Design your own face mask - VELK</title>
    </Helmet>
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
    <Space h="md" />
    <Title order={2}>Choose from our collections</Title>
    <Space h="md" />
    <CollectionsList preview />
  </>
);

export default IndexPage;
