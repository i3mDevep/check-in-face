import { DialogActions } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import { useStorageImages } from '../../hooks/useStorageImages';
import {
  useIdentificationDispatch,
  useIdentificationState,
} from 'src/app/shared/provider/identification-provider';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { SelectedActionType } from 'src/app/shared/provider/identification-provider/state';

export const ButtonActionSave = ({ file, onEnd }: { file?: File, onEnd: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { workerSelected } = useIdentificationState();
  const dispatch = useIdentificationDispatch();
  const { saveImage } = useStorageImages();

  const handleSaveFile = async () => {
    if (!workerSelected || !file) return;
    setIsLoading(true);
    await saveImage({
      file,
      identification: workerSelected?.identification,
      name: uuidV4(),
    });
    setIsLoading(false);
    dispatch({ type: SelectedActionType.SELECT, payload: null });
    onEnd()
  };

  return (
    <DialogActions>
      <LoadingButton
        loading={isLoading}
        disabled={!file}
        onClick={handleSaveFile}
        variant="outlined"
      >
        Save
      </LoadingButton>
    </DialogActions>
  );
};
