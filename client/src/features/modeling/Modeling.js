import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import {
  AmbientLight,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { ActionIcon, Box, Button, createStyles, Group, LoadingOverlay, Paper, Title, ColorPicker } from '@mantine/core';
import { useUser } from 'core/user';
import { EditIcon } from 'theme/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { uploadImage } from 'shared/api/http/images';
import useCurrentModel from 'core/currentModel';
import useConfigurationQuery from 'shared/api/configuration/useConfigurationQuery';

const otherContentSize = 225;
const panelWidth = 450;
const contentGap = 50;

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'flex-end',
    boxSizing: 'border-box',
    paddingTop: contentGap,
    justifyContent: 'space-between',
    height: `calc(100vh - ${otherContentSize - contentGap}px)`,
    width: '100%',
  },
  wrapperHidden: {
    opacity: 0,
  },
  modeling: {
    alignSelf: 'center',
    backgroundColor: theme.colors.gray[0],
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: panelWidth,
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

const Modeling = () => {
  const navigate = useNavigate();

  const { isAdmin } = useUser();

  const modelingContainerRef = useRef();
  const wrapperRef = useRef();

  const rendererRef = useRef();
  const cameraRef = useRef();
  const orbitControlsRef = useRef();
  const sceneRef=useRef();

  const currentModel = useCurrentModel();

  const [loadingMaterialsCount, setLoadingMaterialsCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const { classes, cx } = useStyles();

  const handleModelSave = async () => {
    setIsLoading(true);

    const cameraPositions = [
      [3, 3, 3],
      [4, 1, 0],
      [0, 0, 5],
    ];

    const imagesDataUrls = [];

    orbitControlsRef.current.enabled = false;

    for (const position of cameraPositions) {
      cameraRef.current.position.set(...position);
      cameraRef.current.lookAt(orbitControlsRef.current.target);

      await new Promise((resolve) => requestAnimationFrame(resolve));

      imagesDataUrls.push(rendererRef.current.domElement.toDataURL());
    }

    const images = await Promise.all(
      imagesDataUrls.map((url) =>
        fetch(url)
          .then((img) => img.blob())
          .then((blob) => uploadImage(new File([blob], 'mask'))),
      ),
    );

    currentModel.setCurrentModel({
      imageIds: images.map((i) => i.id),
    });

    navigate('/review');
  };

  const changeColor = (color) => {
    sceneRef.current.getObjectByName('main_Design_area').material.color.set(color);
  }

  useEffect(() => {
    const getModelSize = () => {
      const width = wrapperRef.current.clientWidth - panelWidth - contentGap;
      const height = window.innerHeight - otherContentSize;
      const size = Math.min(width, height, 800);

      return {
        width: size,
        height: size,
      };
    };

    const scene = new Scene();

    const camera = new PerspectiveCamera(4);
    camera.position.set(3, 3, 3);

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    const rendererSize = getModelSize();
    renderer.setSize(rendererSize.width, rendererSize.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    modelingContainerRef.current.appendChild(renderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableZoom = false;
    orbitControls.enableKeys = false;
    orbitControls.enablePan = false;
    orbitControls.enableDamping = false;

    const ambientLight = new AmbientLight(0xffffff, 0.5);

    const pointLight = new PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 10;
    pointLight.position.z = 4;

    scene.add(ambientLight, pointLight);

    new ColladaLoader().load('/models/material/model.xml', (mask) => {
      scene.add(mask.scene);

      new TextureLoader().load('/models/material/inner-fabric.png', (texture) => {
        mask.scene.getObjectByName('Inner_area').material = new MeshBasicMaterial({ map: texture });
        setLoadingMaterialsCount((prev) => prev - 1);
      });

      new TextureLoader().load('/models/material/outer-fabric-new.jpeg', (texture) => {
        mask.scene.getObjectByName('main_Design_area').material.map = texture;
        mask.scene.getObjectByName('main_Design_area').material.color.set('#485754');
        setLoadingMaterialsCount((prev) => prev - 1);
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const size = getModelSize();

      renderer.setSize(size.width, size.height);
    };

    animate();
    window.addEventListener('resize', handleResize, { passive: true });

    rendererRef.current = renderer;
    cameraRef.current = camera;
    orbitControlsRef.current = orbitControls;
    sceneRef.current = scene;

    return () => {
      renderer.domElement.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: configuration } = useConfigurationQuery();

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Group ref={wrapperRef} className={cx(classes.wrapper, isLoading && classes.wrapperHidden)}>
        <Box className={classes.modeling}>
          <div ref={modelingContainerRef} style={{ visibility: loadingMaterialsCount === 0 ? 'visible' : 'hidden' }} />
        </Box>
        <Paper className={classes.panel} shadow="md" radius="sm" padding="md" withBorder>
          <Title className={classes.title}>
            Customize your mask
            {isAdmin && (
              <ActionIcon color="blue" size="md" component={NavLink} to="/admin/configure">
                <EditIcon className={classes.editIcon} />
              </ActionIcon>
            )}
          </Title>
          <ColorPicker
            format="hex"
            onChange={changeColor}
            withPicker={false}
            swatches={configuration.colors}
          />
          <Button size="lg" color="teal" fullWidth onClick={handleModelSave}>
            Continue
          </Button>
        </Paper>
      </Group>
    </>
  );
};

export default Modeling;
