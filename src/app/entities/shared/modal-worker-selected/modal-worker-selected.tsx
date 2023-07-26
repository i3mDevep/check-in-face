import { ReactNode } from 'react';
import {
  useIdentificationDispatch,
  useIdentificationState,
} from 'src/app/shared/provider/identification-provider';
import { SelectedActionType } from 'src/app/shared/provider/identification-provider/state';
import {
  DialogBase,
  DialogBaseProps,
} from 'src/app/shared/components/dialog-base';

interface ModalWorkerSelectedProps
  extends Omit<DialogBaseProps, 'dialogProps'> {
  children: ReactNode;
  onCloseProp: () => void;
  dialogProps?: DialogBaseProps['dialogProps'];
}

export const ModalWorkerSelected = ({
  children,
  title,
  description,
  dialogProps,
  otherComponent,
  onCloseProp,
}: ModalWorkerSelectedProps) => {

  const { workerSelected } = useIdentificationState();
  const dispatch = useIdentificationDispatch();
  const onClose = () => {
    dispatch({ type: SelectedActionType.SELECT, payload: null });
    onCloseProp();
  };

  return (
    <DialogBase
      title={title}
      description={description}
      dialogProps={{ open: !!workerSelected, onClose: onClose, ...dialogProps }}
      otherComponent={otherComponent}
    >
      {children}
    </DialogBase>
  );
};
