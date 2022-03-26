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
import { Box, Button, createStyles, Group, Paper, Title } from '@mantine/core';

const modelHeight = 800;

const useStyles = createStyles((theme) => ({
  wrapper: {
    justifyContent: 'space-between',
    height: 'calc(100vh - 175px)',
    width: '100%',
  },
  modeling: {
    backgroundColor: theme.colors.gray[0],
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: modelHeight,
    width: 450,
  },
  title: {
    textAlign: 'center',
    marginTop: '0 !important',
  },
}));

const Modeling = () => {
  const modelingContainerRef = useRef();
  const [loadingMaterialsCount, setLoadingMaterialsCount] = useState(2);

  const { classes } = useStyles();

  useEffect(() => {
    const scene = new Scene();

    const camera = new PerspectiveCamera(4);
    camera.position.set(3, 3, 3);

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(modelHeight, modelHeight);
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

      new TextureLoader().load('/models/material/outer-fabric.jpeg', (texture) => {
        mask.scene.getObjectByName('main_Design_area').material.map = texture;
        setLoadingMaterialsCount((prev) => prev - 1);
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => renderer.domElement.remove();
  }, []);

  return (
    <Group className={classes.wrapper}>
      <Box className={classes.modeling}>
        <div ref={modelingContainerRef} style={{ visibility: loadingMaterialsCount === 0 ? 'visible' : 'hidden' }} />
      </Box>
      <Paper className={classes.panel} shadow="md" radius="sm" padding="md" withBorder>
        <Title className={classes.title}>Customize your mask</Title>
        <Button size="lg" color="teal" fullWidth>
          Continue
        </Button>
      </Paper>
    </Group>
  );
};

export default Modeling;
