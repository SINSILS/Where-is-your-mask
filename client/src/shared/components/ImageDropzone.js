import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { createStyles, Group, Space, Text } from '@mantine/core';
import { CircledCheckIcon, CircledCrossIcon, FileImageIcon } from 'theme/icons';
import config from 'core/config';
import { uploadImage } from 'shared/api/http/images';
import useNotification from 'core/notification';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 196,
    pointerEvents: 'none',
  },
  withError: {
    border: `2px dashed ${theme.colors.red[5]}`,
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

const ImageDropzone = ({ onUpload, hasError }) => {
  const { showErrorNotification } = useNotification();

  const { classes, cx } = useStyles();

  const handleDrop = (files) => uploadImage(files[0]).then(onUpload);

  const handleReject = () =>
    showErrorNotification({
      message: `Selected image is invalid. Only jpg or png images under ${config.maxImageSizeMb}MB in size are supported`,
    });

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={handleReject}
      accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
      maxSize={config.maxImageSizeMb * 1024 ** 3}
      className={hasError ? classes.withError : undefined}
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
              <Text size="md" inline>
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
