import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

const Modeling = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new Scene();

    scene.add(new AxesHelper(5));

    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(3, 3, 3);

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(800, 800);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerRef.current.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const loader = new ColladaLoader();
    loader.load('http://localhost:3000/model.xml', (mask) => {
      scene.add(mask.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => renderer.domElement.remove();
  }, []);

  return <div ref={containerRef} />;
};

export default Modeling;
