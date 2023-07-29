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
import { TracerTimeReason } from '../tracer-time-worker-table/tracer-time-reason';
import { Stack } from '@mui/material';
import { TRACER_REASON, typeWithTracerReason } from '../../const/tracer-types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function MarkWorkerTime() {
  const webcamRef = useRef<Webcam>(null);
  const [messageSnackbar, setMessageSnackbar] = useState<{
    message: string;
    severity: AlertProps['severity'];
  } | null>();

  const [reasonSelected, setReasonSelected] = useState<
    TRACER_REASON | string | null
  >(null);

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

    setMessageSnackbar(null);
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
    try {
      const result = await markTimeWorker({
        variables: {
          props: {
            dateRegister: new Date().toISOString(),
            imageKey: `timeline-worker/${imageSaved.key}`,
            reason: reasonSelected,
            type: typeWithTracerReason[reasonSelected as TRACER_REASON],
          },
        },
      });
  
      setMessageSnackbar({
        message: `${result?.data?.markRecordWorker?.identification} - ${result?.data?.markRecordWorker?.fullName}`,
        severity: 'success',
      });
  
      handleCloseModal();
    } catch (error: any) {
      webcamRef.current?.video?.play();

      setMessageSnackbar({
        message: error.message,
        severity: 'error',
      });
    }

  }, [markTimeWorker, reasonSelected, saveImage]);

  return (
    <>
      <Snackbar
        open={!!messageSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageSnackbar?.severity}
          sx={{ width: '100%' }}
        >
          {messageSnackbar?.message}
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
