import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { createStyles, Group, Space, Text } from '@mantine/core';
import { CircledCheckIcon, CircledCrossIcon, FileImageIcon } from 'theme/icons';
import config from 'core/config';
import { uploadImage } from 'shared/api/http/images';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 220,
    pointerEvents: 'none',
  },
  imageIcon: {
    height: 80,
    width: 100,
  },
  rejectedIcon: {
    fill: theme.colors.red[5],
  },
  acceptedIcon: {
    color: theme.colors.green[5],
  },
}));

const ImageDropzone = ({ onUpload }) => {
  const { classes, cx } = useStyles();

  const handleDrop = (files) => uploadImage(files[0]).then(onUpload);

  const handleReject = () => {
    // TODO: show error popup if image is too large
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={handleReject}
      accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
      maxSize={config.maxImageSizeMb * 1024 ** 3}
    >
      {(status) => {
        const Icon = status.accepted ? CircledCheckIcon : status.rejected ? CircledCrossIcon : FileImageIcon;

        return (
          <Group position="center" spacing="xl" className={classes.wrapper}>
            <Group direction="column" position="center" spacing={0}>
              <Icon
                className={cx(
                  classes.imageIcon,
                  status.rejected && classes.rejectedIcon,
                  status.accepted && classes.acceptedIcon,
                )}
              />
              <Space h="md" />
              <Text size="xl" inline>
                Drag an image here or click to select a file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Image file should not exceed {config.maxImageSizeMb}mb
              </Text>
            </Group>
          </Group>
        );
      }}
    </Dropzone>
  );
};

export default ImageDropzone;
