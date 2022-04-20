import ImagesConfiguration, { useSelectedImages } from 'features/modeling/components/ImagesConfiguration';
import { Space } from '@mantine/core';
import ImageDropzone from 'shared/components/ImageDropzone';

const ImagesSelection = ({ onAddImage, onUpdateImage, onRemoveImage }) => {
  const configuration = useSelectedImages({
    onAddConfiguration: onAddImage,
    onUpdateConfiguration: onUpdateImage,
    onRemoveConfiguration: onRemoveImage,
  });

  return (
    <>
      <ImageDropzone onUpload={({ id }) => configuration.addImage(id)} />
      {configuration.configurations.length > 0 && (
        <Space h="xl" />
      )}
      <ImagesConfiguration
        configurations={configuration.configurations}
        onUpdateConfiguration={configuration.updateConfiguration}
        onRemoveConfiguration={configuration.removeConfiguration}
      />
    </>
  );
};

export default ImagesSelection;
