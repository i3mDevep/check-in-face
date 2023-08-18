import { useState } from 'react';
import { Alert, AlertProps, Snackbar } from '@mui/material';

export const useNotification = () => {
  const [messageSnackbar, setMessageSnackbar] = useState<{
    message: string;
    severity: AlertProps['severity'];
  } | null>();

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageSnackbar(null);
  };

  const component = (
    <Snackbar
      open={!!messageSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={messageSnackbar?.severity}
        sx={{ width: '100%' }}
      >
        {messageSnackbar?.message}
      </Alert>
    </Snackbar>
  );

  return { component, setMessageSnackbar, messageSnackbar };
};
