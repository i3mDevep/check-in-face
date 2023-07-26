import { ReactNode } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface DialogBaseProps {
  title?: string;
  description?: string;
  children: ReactNode;
  dialogProps: DialogProps;
  otherComponent?: JSX.Element | JSX.Element[];
}

export const DialogBase = ({
  children,
  dialogProps,
  title,
  description,
  otherComponent,
}: DialogBaseProps) => {
  return (
    <Dialog {...dialogProps}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {description && (
          <DialogContentText sx={{ margin: 15 }}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      {otherComponent}
    </Dialog>
  );
};
