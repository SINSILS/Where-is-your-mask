import { useState } from 'react';
import { Box, Button, Group, Popover, SegmentedControl, Slider, Text } from '@mantine/core';
import Image from 'shared/components/Image';
import { localImageSrc } from 'core/images';
import { IMAGE_JUSTIFY } from 'features/modeling/enums';
import { useLatest } from 'react-use';

const defaultImageConfiguration = (imageId) => ({
  id: Date.now(),
  imageId,
  justify: IMAGE_JUSTIFY.right,
  rotation: 0,
  size: 4,
});

export const useSelectedImages = ({ onAddConfiguration, onUpdateConfiguration, onRemoveConfiguration }) => {
  const [selectedImagesConfigurations, setSelectedImagesConfigurations] = useState([]);

  return {
    configurations: selectedImagesConfigurations,
    addImage: (imageId) => {
      const configuration = defaultImageConfiguration(imageId);

      setSelectedImagesConfigurations((prevConfigurations) => [...prevConfigurations, configuration]);
      onAddConfiguration(configuration);
    },
    updateConfiguration: (configuration) => {
      setSelectedImagesConfigurations((prevConfigurations) => {
        const newConfigurations = [...prevConfigurations];

        newConfigurations[newConfigurations.findIndex((x) => x.id === configuration.id)] = configuration;

        return newConfigurations;
      });
      onUpdateConfiguration(configuration);
    },
    removeConfiguration: (id) => {
      setSelectedImagesConfigurations((prevConfigurations) => prevConfigurations.filter((x) => x.id !== id));
      onRemoveConfiguration(id);
    },
  };
};

const Configuration = ({ configuration, onChange }) => {
  const latestConfigurationRef = useLatest(configuration);

  return (
    <Group direction="column" grow>
      <Box>
        <Text>Justify</Text>
        <SegmentedControl
          value={configuration.justify}
          onChange={(justify) => onChange({ ...latestConfigurationRef.current, justify })}
          data={[
            { label: 'Left', value: IMAGE_JUSTIFY.left },
            { label: 'Center', value: IMAGE_JUSTIFY.center },
            { label: 'Right', value: IMAGE_JUSTIFY.right },
            { label: 'Stretch', value: IMAGE_JUSTIFY.stretch },
          ]}
        />
      </Box>
      <Box>
        <Text>Size</Text>
        <Slider
          label={null}
          step={1}
          min={1}
          max={7}
          disabled={configuration.justify === IMAGE_JUSTIFY.stretch}
          value={configuration.size}
          onChange={(size) => onChange({ ...latestConfigurationRef.current, size })}
          marks={[
            { value: 1, label: 'x1' },
            { value: 3, label: 'x3' },
            { value: 5, label: 'x5' },
            { value: 7, label: 'x7' },
          ]}
        />
      </Box>
      <div />
      <Box>
        <Text>Rotation</Text>
        <Slider
          label={null}
          value={configuration.rotation}
          onChange={(rotation) => onChange({ ...latestConfigurationRef.current, rotation })}
          marks={[
            { value: 0, label: '0°' },
            { value: 25, label: '90°' },
            { value: 50, label: '180°' },
            { value: 75, label: '270°' },
            { value: 100, label: '0°' },
          ]}
        />
      </Box>
      <div />
    </Group>
  );
};

const ImagesConfiguration = ({ configurations, onUpdateConfiguration, onRemoveConfiguration }) => {
  const [editConfigurationId, setEditConfigurationId] = useState(null);

  if (configurations.length === 0) {
    return null;
  }

  return (
    <Group spacing="sm" sx={{ justifyContent: 'space-between' }}>
      {configurations.map((c, i) => (
        <Box key={c.id}>
          <Image src={localImageSrc(c.imageId)} alt={`Image ${i + 1}`} height={178} width={178} />
          <Group grow spacing="xs">
            <Button variant="outline" onClick={() => onRemoveConfiguration(c.id)}>
              Delete
            </Button>
            <Popover
              opened={c.id === editConfigurationId}
              onClose={() => setEditConfigurationId(null)}
              position="top"
              placement="center"
              noClickOutside
              withArrow
              withCloseButton
              target={
                <Button onClick={() => setEditConfigurationId(c.id)} fullWidth>
                  Edit
                </Button>
              }
              radius="xs"
            >
              <Configuration configuration={c} onChange={onUpdateConfiguration} />
            </Popover>
          </Group>
        </Box>
      ))}
    </Group>
  );
};

export default ImagesConfiguration;
