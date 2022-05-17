import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  ColorInput,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import ColorsPicker from 'features/modeling/components/ColorsPicker';
import useConfigurationQuery from 'shared/api/configuration/useConfigurationQuery';
import useMutateConfiguration from 'shared/api/configuration/useMutateConfiguration';
import { useState } from 'react';
import {
  addColorToConfiguration,
  addStickerToConfiguration,
  removeColorFromConfiguration,
  removeStickerFromConfiguration,
} from 'shared/api/http/configuration';
import ImageDropzone from 'shared/components/ImageDropzone';
import Image from 'shared/components/Image';
import DeleteButtonBadge from 'shared/components/DeleteButtonBadge';
import { localImageSrc } from 'core/images';
import useNotification from 'core/notification';

const useStyles = createStyles({
  sticker: {
    position: 'relative',
  },
});

const ModelingConfigurationPage = () => {
  const { showErrorNotification, showSuccessNotification } = useNotification();

  const [selectedColor, setSelectedColor] = useState('');
  const [hasError, setHasError] = useState(false);

  const { data: configuration } = useConfigurationQuery();

  const addColorMutation = useMutateConfiguration(addColorToConfiguration, {
    onSettled: () => {
      setSelectedColor('');
    },
    onSuccess: () => {
      showSuccessNotification({ message: 'New color added successfully' });
    },
    onError: () => {
      showErrorNotification({ message: 'Failed to add new color' });
    },
  });
  const removeColorMutation = useMutateConfiguration(removeColorFromConfiguration, {
    onSuccess: () => {
      showSuccessNotification({ message: 'Color removed successfully' });
    },
    onError: () => {
      showErrorNotification({ message: 'Failed to remove the color' });
    },
  });

  const addStickerMutation = useMutateConfiguration(addStickerToConfiguration, {
    onSuccess: () => {
      showSuccessNotification({ message: 'New sticker added successfully' });
    },
    onError: () => {
      showErrorNotification({ message: 'Failed to add new sticker' });
    },
  });
  const removeStickerMutation = useMutateConfiguration(removeStickerFromConfiguration, {
    onSuccess: () => {
      showSuccessNotification({ message: 'Sticker removed successfully' });
    },
    onError: () => {
      showErrorNotification({ message: 'Failed to add new sticker' });
    },
  });

  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Configure - VELK</title>
      </Helmet>
      <LoadingOverlay
        visible={
          !configuration ||
          addStickerMutation.isLoading ||
          removeStickerMutation.isLoading ||
          removeColorMutation.isLoading
        }
      />
      <Title order={2}>Configure modeling tool</Title>
      {configuration && (
        <>
          <Title order={3}>Available colors</Title>
          <Space h="xs" />
          <Group>
            <Box>
              <ColorInput
                placeholder="Pick color"
                label="Add new color"
                value={selectedColor}
                onChange={(color) => {
                  setSelectedColor(color);
                  setHasError(false);
                }}
                error={hasError ? 'Color is required' : undefined}
              />
              <Space h="xs" />
              <Button
                fullWidth
                loading={addColorMutation.isLoading}
                onClick={() => (selectedColor ? addColorMutation.mutate(selectedColor) : setHasError(true))}
              >
                Save
              </Button>
            </Box>
            <ColorsPicker colors={configuration.colors} onColorRemove={removeColorMutation.mutate} />
          </Group>
          <Space h="xl" />
          <Space h="xl" />
          <Divider />
          <Title order={3}>Available stickers</Title>
          <Space h="xs" />
          <ImageDropzone onUpload={({ id }) => addStickerMutation.mutate(id)} />
          <Space h="xl" />
          {configuration.stickers.length === 0 ? (
            <Text align="center">No stickers exist</Text>
          ) : (
            <SimpleGrid
              cols={4}
              spacing="lg"
              breakpoints={[
                { maxWidth: 1300, cols: 3 },
                { maxWidth: 1000, cols: 2 },
                { maxWidth: 670, cols: 1 },
              ]}
            >
              {configuration.stickers.map((imageId, index) => (
                <Box key={imageId} className={classes.sticker}>
                  <Image src={localImageSrc(imageId)} alt={`Sticker ${index + 1}`} height={230} />
                  <DeleteButtonBadge onClick={() => removeStickerMutation.mutate(imageId)} />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </>
  );
};

export default ModelingConfigurationPage;
