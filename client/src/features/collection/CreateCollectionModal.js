import { Box, Button, createStyles, Group, LoadingOverlay, Modal, Space, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import ImageDropzone from 'shared/components/ImageDropzone';
import Image from 'shared/components/Image';
import DeleteButtonBadge from 'shared/components/DeleteButtonBadge';
import { useUpdateEffect } from 'react-use';
import { localImageSrc } from 'core/images';

const useStyles = createStyles({
  inputs: {
    flex: 1,
  },
  description: {
    textarea: {
      height: 120,
    },
  },
  imageWrapper: {
    position: 'relative',
    maxWidth: 340,
  },
});

const SCHEMA = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  imageId: yup.string().required('Image is required'),
});

const CreateCollectionModal = ({ opened, onClose, onSubmit, loading, initialCollection }) => {
  const form = useForm({
    initialValues: initialCollection ?? {
      name: '',
      description: '',
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

  const title = initialCollection ? 'Update' : 'Create';

  return (
    <Modal opened={opened} onClose={onClose} title={`${title} a collection`} centered size="xl">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group position="apart" align="stretch">
          <Box className={classes.inputs}>
            <TextInput label="Name" placeholder="Name the collection" {...form.getInputProps('name')} />
            <Space h="lg" />
            <Textarea
              className={classes.description}
              label="Description"
              placeholder="Describe the collection"
              {...form.getInputProps('description')}
            />
          </Box>
          {form.values.imageId ? (
            <Box className={classes.imageWrapper}>
              <Image src={localImageSrc(form.values.imageId)} alt="Collection image" height={230} />
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
          <Button type="submit">{title}</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CreateCollectionModal;
