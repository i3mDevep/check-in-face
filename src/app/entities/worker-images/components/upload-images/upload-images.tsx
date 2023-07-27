import { useCallback, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Webcam from 'react-webcam';

import { ModalCameraUpdate } from './modal-camera-upload';

import './override.css';

const fileTypes = ['JPG', 'PNG'];

export interface UploadImagesProps {
  onCaptureImageUrl: (img: string | null | undefined) => void;
}

export const UploadImages = ({ onCaptureImageUrl }: UploadImagesProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [modalCamera, setModalCamera] = useState(false);

  const handleCloseModalCamera = () => setModalCamera(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    onCaptureImageUrl(imageSrc);
    handleCloseModalCamera();
  }, [onCaptureImageUrl]);

  const handleChangeInputFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const dataBase64 = fileReader.result;
      onCaptureImageUrl(dataBase64 as string);
    };
  };

  return (
    <>
      <FileUploader
        label="Upload a file here"
        classes="container_upload"
        types={fileTypes}
        handleChange={handleChangeInputFile}
      />
      <ModalCameraUpdate
        ref={webcamRef}
        open={modalCamera}
        onClose={handleCloseModalCamera}
        capturePicture={capture}
      />
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setModalCamera(true);
        }}
        sx={{ position: 'absolute', top: '60%', left: '30%', zIndex: 1 }}
      >
        <PhotoCameraIcon />
      </IconButton>
    </>
  );
};
