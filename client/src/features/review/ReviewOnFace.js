import { useEffect, useRef, useState } from 'react';
import useNotification from 'core/notification';
import { Group, LoadingOverlay } from '@mantine/core';
import { useLatest, useUnmount } from 'react-use';
import config from 'core/config';
import useCurrentModel from 'core/currentModel';

const SOCKET_FREQUENCY = 90;

const ReviewOnFace = () => {
  const { model: currentModel } = useCurrentModel();
  const currentModelRef = useLatest(currentModel);

  const { showErrorNotification } = useNotification();

  const [isLoadingWebcam, setIsLoadingWebcam] = useState(true);

  const inputCanvasRef = useRef();
  const inputVideoRef = useRef();
  const outputCanvasRef = useRef();

  const socketRef = useRef(null);
  const outputImageRef = useRef(null);

  const videoStreamIntervalRef = useRef(null);

  const clearVideoStreamInterval = () => {
    if (videoStreamIntervalRef.current !== null) {
      clearInterval(videoStreamIntervalRef.current);
      videoStreamIntervalRef.current = null;
    }
  };

  const handleInputVideoLoad = () => {
    inputCanvasRef.current.width = inputVideoRef.current.videoWidth;
    inputCanvasRef.current.height = inputVideoRef.current.videoHeight;

    socketRef.current = new WebSocket(`${config.wsUrl}/review/on-face`);

    socketRef.current.addEventListener('message', (e) => {
      outputImageRef.current.src = e.data;
    });

    socketRef.current.addEventListener('error', () => {
      showErrorNotification({ message: 'Unexpected error has occurred' });
    });

    socketRef.current.addEventListener('open', () => {
      setIsLoadingWebcam(false);

      socketRef.current.send(currentModelRef.current.imageIds[currentModelRef.current.imageIds.length - 1]);

      videoStreamIntervalRef.current = setInterval(() => {
        inputCanvasRef.current
          .getContext('2d')
          .drawImage(inputVideoRef.current, 0, 0, inputCanvasRef.current.width, inputCanvasRef.current.height);

        socketRef.current.send(inputCanvasRef.current.toDataURL());
      }, SOCKET_FREQUENCY);
    });

    socketRef.current.addEventListener('close', clearVideoStreamInterval);
  };

  useUnmount(() => {
    socketRef.current?.close();
    clearVideoStreamInterval();
  });

  useEffect(() => {
    const image = new Image();

    const handleLoad = () => {
      outputCanvasRef.current.width = image.width;
      outputCanvasRef.current.height = image.height;

      outputCanvasRef.current
        .getContext('2d')
        .clearRect(0, 0, outputCanvasRef.current.width, outputCanvasRef.current.height);

      outputCanvasRef.current.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
    };

    image.addEventListener('load', handleLoad);

    outputImageRef.current = image;

    return () => {
      image.removeEventListener('load', handleLoad);
    };
  });

  useEffect(() => {
    let streamRef = null;

    if (typeof navigator.mediaDevices?.getUserMedia === 'function') {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (inputVideoRef.current) {
            inputVideoRef.current.srcObject = stream;
            streamRef = stream;
          }
        })
        .catch(() => showErrorNotification({ message: 'Webcam access is required for this page to work' }));
    } else {
      showErrorNotification({ message: 'Your browser does not support Webcam' });
    }

    return () => {
      streamRef?.getTracks().forEach((t) => t.stop());
    };
  }, [showErrorNotification]);

  return (
    <>
      <LoadingOverlay visible={isLoadingWebcam} />
      <canvas ref={inputCanvasRef} hidden />
      <Group position="center">
        <canvas ref={outputCanvasRef} />
      </Group>
      <video
        ref={inputVideoRef}
        hidden
        autoPlay
        onLoadedData={handleInputVideoLoad}
        onError={() => showErrorNotification({ message: 'Failed to load a webcam' })}
      />
    </>
  );
};

export default ReviewOnFace;
