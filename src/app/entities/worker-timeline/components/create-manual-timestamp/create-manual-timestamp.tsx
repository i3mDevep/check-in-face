import { useState } from 'react';
import { DialogBase } from 'src/app/shared/components/dialog-base';
import {
  Alert,
  AlertProps,
  Chip,
  IconButton,
  Snackbar,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TimeClock } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import {
  TRACER_REASON_MANUAL,
  typeWithTracerReasonManual,
} from '../../const/tracer-types';
import { useGraphqlMarkTimeWorker } from '../../hooks/useGraphqlMarkTimeWorker';
import { LoadingButton } from '@mui/lab';
import { useGraphqlWorkerImages } from 'src/app/entities/worker-images/hooks/useGraphqlWorkerImages';

export function ModalCreateTimestamp({
  identification,
}: {
  identification: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
  const [reason, setReason] = useState<TRACER_REASON_MANUAL>();
  const [messageSnackbar, setMessageSnackbar] = useState<{
    message: string;
    severity: AlertProps['severity'];
  } | null>();

  const {
    mutationMarkTimeWorker: [markTimeWorker, { loading: loadingMutationMark }],
  } = useGraphqlMarkTimeWorker();
  const { resultGetWorkerImages } = useGraphqlWorkerImages(identification);
  console.log(
    '🚀 ~ file: create-manual-timestamp.tsx:24 ~ ModalCreateTimestamp ~ resultGetWorkerImages:',
    resultGetWorkerImages
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageSnackbar(null);
  };

  const handleRegisterTimestamp = async () => {
    try {
      if (
        !reason ||
        !value ||
        !resultGetWorkerImages?.data?.getWorkerImages?.[0]
      )
        return;
      const result = await markTimeWorker({
        variables: {
          props: {
            dateRegister: value.toISOString(),
            imageKey: resultGetWorkerImages?.data?.getWorkerImages?.[0]
              .pathFaceInCollection as string,
            reason,
            type: typeWithTracerReasonManual[reason as TRACER_REASON_MANUAL],
          },
        },
      });
      setMessageSnackbar({
        message: `${result?.data?.markRecordWorker?.identification} - ${result?.data?.markRecordWorker?.fullName}`,
        severity: 'success',
      });

      handleClose();
    } catch (error: any) {
      setMessageSnackbar({
        message: error.message,
        severity: 'error',
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{ margin: 'auto 0' }}
        color="primary"
        title="Create timestamp"
      >
        <AddIcon />
      </IconButton>
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
      <DialogBase
        title="Create timestamp"
        description="To create a new manual timestamp. select date and time"
        dialogProps={{ open, onClose: handleClose }}
      >
        {value?.format('MMMM D, YYYY h:mm A')}
        <TimeClock
          value={value}
          onChange={(newValue) => setValue(newValue)}
          showViewSwitcher
        />
        <Stack direction="column" gap={10}>
          <Stack direction="row" justifyContent="space-around">
            {Object.entries(TRACER_REASON_MANUAL).map(([key, reason_]) => (
              <Chip
                key={key}
                onClick={() => setReason(reason_)}
                label={reason_}
                sx={{ margin: '0px !important' }}
                color="primary"
                {...(reason !== reason_ && { variant: 'outlined' })}
              />
            ))}
          </Stack>
          <LoadingButton
            loading={loadingMutationMark}
            onClick={handleRegisterTimestamp}
            disabled={!reason}
          >
            Create
          </LoadingButton>
        </Stack>
      </DialogBase>
    </>
  );
}
