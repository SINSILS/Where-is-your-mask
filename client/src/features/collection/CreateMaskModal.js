import { Box, Button, createStyles, Group, LoadingOverlay, Modal, Space, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import ImageDropzone from 'shared/components/ImageDropzone';
import Image from 'shared/components/Image';
import DeleteButtonBadge from 'shared/components/DeleteButtonBadge';
import { useUpdateEffect } from 'react-use';
import { localImageSrc } from 'core/images';
import PriceInput from 'shared/components/inputs/PriceInput';

const useStyles = createStyles({
  inputs: {
    flex: 1,
  },
  imageWrapper: {
    position: 'relative',
    maxWidth: 340,
  },
});

const SCHEMA = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  imageId: yup.string().required('Image is required'),
});

const CreateMaskModal = ({ opened, onClose, onSubmit, loading }) => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: undefined,
      imageId: '',
    },
    schema: yupResolver(SCHEMA),
  });

  useUpdateEffect(() => {
    if (opened) {
      form.reset();
    }
  }, [opened]);

  const { classes } = useStyles();

  return (
    <Modal opened={opened} onClose={onClose} title="Create a mask" centered size="xl">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group position="apart" align="stretch">
          <Box className={classes.inputs}>
            <TextInput label="Name" placeholder="Name the mask" {...form.getInputProps('name')} />
            <Space h="lg" />
            <Textarea
              className={classes.description}
              label="Description"
              placeholder="Describe the mask"
              {...form.getInputProps('description')}
            />
            <Space h="lg" />
            <PriceInput label="Price" {...form.getInputProps('price')} />
          </Box>
          {form.values.imageId ? (
            <Box className={classes.imageWrapper}>
              <Image src={localImageSrc(form.values.imageId)} alt="Mask image" height={260} />
              <DeleteButtonBadge onClick={() => form.setFieldValue('imageId', '')} />
            </Box>
          ) : (
            <ImageDropzone
              onUpload={(image) => form.setFieldValue('imageId', image.id)}
              hasError={form.errors.imageId}
            />
          )}
        </Group>
        <Space h="lg" />
        <Group position="right">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateMaskModal;
