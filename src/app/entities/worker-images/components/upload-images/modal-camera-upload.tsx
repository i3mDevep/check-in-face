import { Alert, Button, DialogActions, Skeleton } from '@mui/material';
import { forwardRef } from 'react';
import Webcam from 'react-webcam';
import { DialogBase } from 'src/app/shared/components/dialog-base';

export const ModalCameraUpdate = forwardRef<
  Webcam,
  { open: boolean; onClose: () => void; capturePicture: () => void }
>(({ open, onClose, capturePicture }, webcamRef) => {
  const videoConstraints = {
    width: 320,
    height: 320,
    facingMode: 'user',
  };

  return (
    <DialogBase
      dialogProps={{ open, onClose }}
      otherComponent={
        <DialogActions>
          <Button
            sx={{ width: 100, margin: 'auto', position: 'relative', top: -20 }}
            variant="contained"
            onClick={capturePicture}
          >
            Capture
          </Button>
        </DialogActions>
      }
    >
      <Alert severity="info">try to be only you in the image</Alert>
      <Webcam
        audio={false}
        mirrored={true}
        height={300}
        width={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <Skeleton
        sx={{ position: 'absolute', top: 105 }}
        variant="rectangular"
        width={300}
        height={220}
      />
    </DialogBase>
  );
});
