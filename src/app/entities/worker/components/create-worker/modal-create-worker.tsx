import { useState } from 'react';
import Button from '@mui/material/Button';
import { FormCreateWorker } from './form-create-worker';
import { DialogBase } from 'src/app/shared/components/dialog-base';

export function ModalCreateWorker() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        sx={{ maxWidth: 200, marginLeft: 'auto' }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Create new worker
      </Button>
      <DialogBase
        title="Create worker"
        description="To create a new worker, please enter your full name here
      the identification must be unique."
        dialogProps={{ open, onClose: handleClose }}
      >
        <FormCreateWorker onSubmitEventSuccess={() => setOpen(false)} />
      </DialogBase>
    </>
  );
}
