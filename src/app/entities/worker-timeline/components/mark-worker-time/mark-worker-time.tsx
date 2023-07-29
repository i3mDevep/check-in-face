import React, { useCallback, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Snackbar from '@mui/material/Snackbar';
import Webcam from 'react-webcam';
import Fab from '@mui/material/Fab';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { convertBase64ToFile } from 'src/app/utils/convert-base64-to-file';
import { ModalWorkerCamera } from 'src/app/entities/shared/modal-worker-camera';

import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useStorageMarkTimeWorker } from '../../hooks/useStorageMarkTimeWorker';
import {
  TRACER_REASON,
  TracerTimeReason,
} from '../tracer-time-worker-table/tracer-time-reason';
import { Stack } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function MarkWorkerTime() {
  const webcamRef = useRef<Webcam>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [reasonSelected, setReasonSelected] = useState<
    TRACER_REASON | string | null
  >(null);
  const [messageSnackbar, setMessageSnackbar] = useState<
    { identification?: string; fullName?: string } | undefined
  >();

  const { saveImage, loading } = useStorageMarkTimeWorker();
  const {
    mutationMarkTimeWorker: [markTimeWorker, { loading: loadingMutationMark }],
  } = useGraphqlMarkTimeWorker();
  const [openModalMarkTime, setOpenModalMarkTime] = useState(false);

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleCloseModal = () => {
    setReasonSelected(null);
    setOpenModalMarkTime(false);
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const nameImage = uuidV4();
    if (!imageSrc || !reasonSelected) return;
    webcamRef.current?.video?.pause();
    const imageFile = convertBase64ToFile(imageSrc, nameImage, 'image/jpeg');
    const imageSaved = await saveImage({ name: nameImage, file: imageFile });
    const result = await markTimeWorker({
      variables: {
        props: {
          dateRegister: new Date().toISOString(),
          imageKey: `timeline-worker/${imageSaved.key}`,
          reason: reasonSelected,
        },
      },
    });

    setMessageSnackbar({ ...result.data?.markRecordWorker });
    setOpenSnackbar(true);
    handleCloseModal();
  }, [markTimeWorker, reasonSelected, saveImage]);

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
      <ModalWorkerCamera
        ref={webcamRef}
        open={openModalMarkTime}
        capturePicture={capture}
        loading={loading || loadingMutationMark}
        onClose={handleCloseModal}
        loadingButtonSx={{ top: 0, marginBottom: 10, marginTop: 10 }}
        disabledCapture={!reasonSelected}
        slots={{
          dialogActionComponent: (
            <Stack
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              width="min-content"
              gap={2}
              spacing={1}
              position="relative"
              top={-20}
            >
              <TracerTimeReason
                selected={reasonSelected as TRACER_REASON}
                onClick={setReasonSelected}
              />
            </Stack>
          ),
        }}
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
