import {
  Accordion,
  ActionIcon,
  Button,
  ColorPicker,
  createStyles,
  Group,
  LoadingOverlay,
  Paper,
  Title,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { EditIcon } from 'theme/icons';
import useConfigurationQuery from 'shared/api/configuration/useConfigurationQuery';
import { useUser } from 'core/user';
import StickersSelection from 'features/modeling/StickersSelection';
import ImagesSelection from 'features/modeling/ImagesSelection';

export const PANEL_WIDTH = 450;

const useStyles = createStyles((theme) => ({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: PANEL_WIDTH,
    position: 'relative',
  },
  panelContent: {
    maxHeight: 'calc(100% - 65px)',
  },
  selections: {
    maxHeight: 'calc(100% - 72px)',
    overflow: 'auto',
    width: '100%',
  },
  title: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    display: 'flex',
    textAlign: 'center',
    marginTop: '0 !important',
  },
  editIcon: {
    height: 30,
    width: 24,
  },
}));

const ModelingPanel = ({ onColorChange, onAddImage, onUpdateImage, onRemoveImage, onModelSave }) => {
  const { isAdmin } = useUser();

  const { data: configuration, isLoading: isLoadingConfiguration } = useConfigurationQuery();

  const { classes } = useStyles();

  return (
    <Paper className={classes.panel} shadow="md" radius="sm" padding="md" withBorder>
      <LoadingOverlay visible={isLoadingConfiguration} />
      <Group direction="column" noWrap className={classes.panelContent}>
        <Title className={classes.title}>
          Customize your mask
          {isAdmin && (
            <ActionIcon color="blue" size="md" component={NavLink} to="/admin/configure">
              <EditIcon className={classes.editIcon} />
            </ActionIcon>
          )}
        </Title>
        {configuration && (
          <Accordion initialItem={0} multiple iconPosition="right" className={classes.selections}>
            <Accordion.Item label="Mask Color">
              <ColorPicker
                format="hex"
                size="xl"
                onChange={onColorChange}
                withPicker={false}
                swatches={configuration.colors}
              />
            </Accordion.Item>
            <Accordion.Item label="Stickers">
              <StickersSelection
                stickers={configuration.stickers}
                onAddSticker={onAddImage}
                onUpdateSticker={onUpdateImage}
                onRemoveSticker={onRemoveImage}
              />
            </Accordion.Item>
            <Accordion.Item label="Images">
              <ImagesSelection onAddImage={onAddImage} onUpdateImage={onUpdateImage} onRemoveImage={onRemoveImage} />
            </Accordion.Item>
          </Accordion>
        )}
      </Group>
      <Button size="lg" color="teal" fullWidth onClick={onModelSave}>
        Continue
      </Button>
    </Paper>
  );
};

export default ModelingPanel;
