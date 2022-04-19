import StickersGroup from 'features/modeling/components/StickersGroup';
import ImagesConfiguration, { useSelectedImages } from 'features/modeling/components/ImagesConfiguration';
import { Space } from '@mantine/core';

const StickersSelection = ({ stickers, onAddSticker, onUpdateSticker, onRemoveSticker }) => {
  const configuration = useSelectedImages({
    onAddConfiguration: onAddSticker,
    onUpdateConfiguration: onUpdateSticker,
    onRemoveConfiguration: onRemoveSticker,
  });

  return (
    <>
      <StickersGroup stickers={stickers} onChooseSticker={configuration.addImage} />
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

export default StickersSelection;
