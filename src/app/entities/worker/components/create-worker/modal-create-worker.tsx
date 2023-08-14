import { useState } from 'react';
import { DialogBase } from 'src/app/shared/components/dialog-base';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormCreateWorker } from './form-create-worker';

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
      <IconButton
        onClick={handleClickOpen}
        sx={{ maxWidth: 200, marginLeft: 'auto' }}
        color="primary"
        data-cy = 'button-create-worker'
        aria-label="add to shopping cart"
      >
        <AddIcon />
      </IconButton>
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
