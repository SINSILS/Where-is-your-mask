import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import {
  AmbientLight,
  Euler,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Box, createStyles, Group, LoadingOverlay, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from 'shared/api/http/images';
import useCurrentModel from 'core/currentModel';
import useNotification from 'core/notification';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import ModelingPanel, { PANEL_WIDTH } from 'features/modeling/ModelingPanel';
import { localImageSrc } from 'core/images';
import { IMAGE_JUSTIFY } from 'features/modeling/enums';
import { useMount } from 'react-use';
import { useModals } from '@mantine/modals';

const otherContentSize = 225;
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
    position: 'relative',
  },
}));

const createImageName = (id) => `image-${id}`;

const Modeling = () => {
  const { showErrorNotification } = useNotification();
  const modals = useModals();

  const navigate = useNavigate();

  const modelingContainerRef = useRef();
  const wrapperRef = useRef();

  const rendererRef = useRef();
  const cameraRef = useRef();
  const orbitControlsRef = useRef();
  const sceneRef = useRef();

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

    try {
      const images = await Promise.all(
        imagesDataUrls.map((url) =>
          fetch(url)
            .then((img) => img.blob())
            .then((blob) => uploadImage(new File([blob], 'mask'))),
        ),
      );

      currentModel.setCurrentModel({
        imageIds: images.map((i) => i.id),
        price: 15,
      });

      navigate('/review');
    } catch {
      showErrorNotification({ message: 'Failed to create a mask' });
    }
  };

  const handleChangeColor = (color) => {
    sceneRef.current.getObjectByName('main_Design_area').material.color.set(color);
  };

  const createImageGeometry = (configuration) => {
    const position = (() => {
      switch (configuration.justify) {
        case IMAGE_JUSTIFY.left:
          return new Vector3(-0.045, 0);

        case IMAGE_JUSTIFY.right:
          return new Vector3(0.045, 0);

        default:
          return new Vector3();
      }
    })();

    const size =
      configuration.justify === IMAGE_JUSTIFY.stretch ? 0.15 + 0.05 * configuration.size : 0.0125 * configuration.size;

    return new DecalGeometry(
      sceneRef.current.getObjectByName('main_Design_area'),
      position,
      new Euler(0, 0, configuration.rotation * 3.6 * (Math.PI / 180)),
      new Vector3(size, size, 1),
    );
  };

  const handleAddImage = (configuration) => {
    new TextureLoader().load(localImageSrc(configuration.imageId), (texture) => {
      const material = new MeshPhongMaterial({
        map: texture,
        shininess: 0,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        wireframe: false,
      });
      const mesh = new Mesh(createImageGeometry(configuration), material);

      mesh.name = createImageName(configuration.id);

      sceneRef.current.add(mesh);
    });
  };

  const handleUpdateImage = (configuration) => {
    const image = sceneRef.current.getObjectByName(createImageName(configuration.id));

    image.geometry = createImageGeometry(configuration);
  };

  const handleRemoveImage = (id) => {
    sceneRef.current.remove(sceneRef.current.getObjectByName(createImageName(id)));
  };

  useMount(() => {
    if (currentModel.model) {
      modals.openConfirmModal({
        title: 'Existing custom mask',
        children: <Text size="sm">It seems that you have already designed a mask. Do you want to review it?</Text>,
        labels: { confirm: 'Review', cancel: 'Discard' },
        onConfirm: () => navigate('/review'),
        onCancel: () => currentModel.clearCurrentModel(),
      });
    }
  });

  useEffect(() => {
    const getModelSize = () => {
      const width = wrapperRef.current.clientWidth - PANEL_WIDTH - contentGap;
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

  return (
    <Group ref={wrapperRef} className={cx(classes.wrapper, isLoading && classes.wrapperHidden)}>
      <Box className={classes.modeling}>
        <div ref={modelingContainerRef} style={{ visibility: loadingMaterialsCount === 0 ? 'visible' : 'hidden' }} />
        <LoadingOverlay visible={isLoading} />
      </Box>
      <ModelingPanel
        onColorChange={handleChangeColor}
        onAddImage={handleAddImage}
        onUpdateImage={handleUpdateImage}
        onRemoveImage={handleRemoveImage}
        onModelSave={handleModelSave}
      />
    </Group>
  );
};

export default Modeling;
