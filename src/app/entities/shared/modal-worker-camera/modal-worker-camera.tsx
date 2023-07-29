import { forwardRef } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, DialogActions, Skeleton, SxProps } from '@mui/material';
import Webcam from 'react-webcam';
import { DialogBase } from 'src/app/shared/components/dialog-base';

export interface ModalWorkerCameraProps {
  open: boolean;
  onClose: () => void;
  capturePicture: () => void;
  loading?: boolean;
  disabledCapture?: boolean;
  slots?: { dialogActionComponent?: JSX.Element };
  loadingButtonSx?: SxProps;
}

export const ModalWorkerCamera = forwardRef<Webcam, ModalWorkerCameraProps>(
  (
    {
      open,
      onClose,
      capturePicture,
      loading,
      disabledCapture,
      slots,
      loadingButtonSx,
    },
    webcamRef
  ) => {
    const videoConstraints = {
      width: 320,
      height: 320,
      facingMode: 'user',
    };

    return (
      <DialogBase
        dialogProps={{ open, onClose }}
        otherComponent={
          <DialogActions sx={{ flexDirection: 'column' }}>
            {slots?.dialogActionComponent}
            <LoadingButton
              sx={{
                width: 100,
                margin: 'auto',
                position: 'relative',
                top: -20,
                ...loadingButtonSx,
              }}
              disabled={disabledCapture}
              variant="contained"
              onClick={capturePicture}
              loading={!!loading}
            >
              Capture
            </LoadingButton>
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
  }
);
