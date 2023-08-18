import React, { useCallback, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Snackbar from '@mui/material/Snackbar';
import Webcam from 'react-webcam';
import Fab from '@mui/material/Fab';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Avatar, Box, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { convertBase64ToFile } from 'src/app/utils/convert-base64-to-file';
import { ModalWorkerCamera } from 'src/app/entities/shared/modal-worker-camera';

import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { useStorageMarkTimeWorker } from '../../hooks/useStorageMarkTimeWorker';
import { TracerTimeReason } from '../tracer-time-worker-table/tracer-time-reason';

import { TRACER_REASON, typeWithTracerReason } from '../../const/tracer-types';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function MarkWorkerTime({ modeFab }: { modeFab: boolean }) {
  const navigation = useNavigate();

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
    } catch (error) {
      webcamRef.current?.video?.play();

      setMessageSnackbar({
        message: (error as { message: string }).message,
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
        hiddenAlert
        ref={webcamRef}
        open={openModalMarkTime}
        capturePicture={capture}
        loading={loading || loadingMutationMark}
        onClose={handleCloseModal}
        dialogProps={{ sx: { '& .MuiDialog-paper': { transform: 'scale(1.2)'} }}}
        loadingButtonSx={{ top: 0, marginBottom: 10, marginTop: 10 }}
        disabledCapture={!reasonSelected}
        slots={{
          dialogActionComponent: (
            <Stack
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              width="min-content"
              gap={10}
              spacing={1}
              position="relative"
            >
              <TracerTimeReason
                selected={reasonSelected as TRACER_REASON}
                onClick={setReasonSelected}
              />
            </Stack>
          ),
        }}
      />
      {modeFab ? (
        <Fab
          sx={{ position: 'fixed', bottom: 0, right: 0, margin: 20 }}
          color="primary"
          aria-label="mark-time"
          onClick={() => setOpenModalMarkTime(true)}
        >
          <EventAvailableIcon />
        </Fab>
      ) : (
        <>
          <Fab
            size="small"
            sx={{ margin: 4 }}
            color="secondary"
            aria-label="home"
            onClick={() => navigation('/app/worker')}
          >
            <HomeIcon />
          </Fab>
          <Box
            component="button"
            bgcolor="primary.main"
            padding={5}
            borderRadius={50}
            position="fixed"
            onClick={() => setOpenModalMarkTime(true)}
            top="calc(50% - 43px)"
            left="calc(50% - 43px)"
          >
            <Avatar
              sx={{ width: 86, height: 86 }}
              src="https://cdn-icons-png.flaticon.com/512/5556/5556512.png"
            />
            <Box
              sx={{ fontSize: 14, left: 30, bottom: 0, position: 'absolute' }}
            >
              <span aria-label="icon-app" role="img">
                🔥
              </span>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
