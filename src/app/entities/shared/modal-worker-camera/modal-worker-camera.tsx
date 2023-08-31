import { forwardRef } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  DialogActions,
  DialogProps,
  Skeleton,
  SxProps,
} from '@mui/material';
import Webcam from 'react-webcam';
import { DialogBase } from 'src/app/shared/components/dialog-base';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
export interface ModalWorkerCameraProps {
  open: boolean;
  onClose: () => void;
  capturePicture: () => void;
  loading?: boolean;
  disabledCapture?: boolean;
  dialogProps?: Partial<DialogProps>;
  slots?: { dialogActionComponent?: JSX.Element };
  loadingButtonSx?: SxProps;
  hiddenAlert?: boolean;
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
      hiddenAlert,
      dialogProps,
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
        dialogProps={{ open, onClose, ...dialogProps }}
        otherComponent={
          <DialogActions sx={{ flexDirection: 'column' }}>
            {slots?.dialogActionComponent}
            <LoadingButton
              sx={{
                width: 100,
                margin: 'auto',
                position: 'relative',
                ...loadingButtonSx,
              }}
              disabled={disabledCapture}
              variant="outlined"
              onClick={capturePicture}
              loading={!!loading}
            >
              <CameraAltIcon />
              capture
            </LoadingButton>
          </DialogActions>
        }
      >
        {!hiddenAlert && (
          <Alert severity="info">try to be only you in the image</Alert>
        )}
        <Box position="relative" display="flex" justifyContent="center">
          <Webcam
            audio={false}
            mirrored={true}
            height={300}
            width={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ objectFit: 'cover' }}
          />
          <Skeleton
            sx={{ position: 'absolute', top: 0 }}
            variant="rectangular"
            width={300}
            height={300}
          />
        </Box>
      </DialogBase>
    );
  }
);
