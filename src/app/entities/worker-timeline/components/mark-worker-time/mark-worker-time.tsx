import React, { useCallback, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Snackbar from '@mui/material/Snackbar';
import Webcam from 'react-webcam';
import Fab from '@mui/material/Fab';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { ModalCameraUpdate } from 'src/app/entities/worker-images/components/upload-images';
import { convertBase64ToFile } from 'src/app/utils/convert-base64-to-file';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useStorageMarkTimeWorker } from '../../hooks/useStorageMarkTimeWorker';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function MarkWorkerTime() {
  const webcamRef = useRef<Webcam>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState<
    { identification?: string; fullName?: string } | undefined
  >();

  const { saveImage, loading } = useStorageMarkTimeWorker();
  const {
    mutationMarkTimeWorker: [markTimeWorker, { loading: loadingMutationMark }],
  } = useGraphqlMarkTimeWorker();
  const [openModalMarkTime, setOpenModalMarkTime] = useState(false);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const nameImage = uuidV4();
    if (!imageSrc) return;
    webcamRef.current?.video?.pause();
    const imageFile = convertBase64ToFile(imageSrc, nameImage, 'image/jpeg');
    const imageSaved = await saveImage({ name: nameImage, file: imageFile });
    const result = await markTimeWorker({
      variables: {
        props: {
          dateRegister: new Date().toISOString(),
          imageKey: `timeline-worker/${imageSaved.key}`,
          reason: 'IN',
        },
      },
    });

    setMessageSnackbar({ ...result.data?.markRecordWorker });
    setOpenSnackbar(true);
    setOpenModalMarkTime(false);
  }, [markTimeWorker, saveImage]);

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {`${messageSnackbar?.identification} - ${messageSnackbar?.fullName}`}
        </Alert>
      </Snackbar>
      <ModalCameraUpdate
        ref={webcamRef}
        open={openModalMarkTime}
        capturePicture={capture}
        loading={loading || loadingMutationMark}
        onClose={() => setOpenModalMarkTime(false)}
      />
      <Fab
        sx={{ position: 'fixed', bottom: 0, right: 0, margin: 20 }}
        color="primary"
        aria-label="mark-time"
        onClick={() => setOpenModalMarkTime(true)}
      >
        <EventAvailableIcon />
      </Fab>
    </>
  );
}
