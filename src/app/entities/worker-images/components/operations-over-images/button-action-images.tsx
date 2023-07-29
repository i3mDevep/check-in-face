import { DialogActions } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import { useStorageCollectionImages } from '../../hooks/useStorageCollectionImages';
import {
  useIdentificationDispatch,
  useIdentificationState,
} from 'src/app/shared/provider/identification-provider';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { SelectedActionType } from 'src/app/shared/provider/identification-provider/state';
import { useGraphqlWorkerImages } from '../../hooks/useGraphqlWorkerImages';
import { delay } from 'src/app/utils/delay';

export const ButtonActionImages = ({
  file,
  onEnd,
  faceIds,
  onEndDisassociateImages,
}: {
  file?: File;
  onEnd: () => void;
  onEndDisassociateImages: () => void;
  faceIds: string[];
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { workerSelected } = useIdentificationState();
  const dispatch = useIdentificationDispatch();
  const { saveImage } = useStorageCollectionImages();
  const {
    lazyGetWorkerImages: [queryWorkerImages],
  } = useGraphqlWorkerImages();
  const {
    disassociateDeleteImagesWorker: [
      disassociateImagesWorker,
      { loading: loadingDeleteImages },
    ],
  } = useGraphqlWorkerImages();

  const handleSaveFile = async () => {
    if (!workerSelected || !file) return;
    setIsLoading(true);
    await saveImage({
      file,
      identification: workerSelected?.identification,
      name: uuidV4(),
    });
    await delay(3000);
    await queryWorkerImages({
      variables: { identification: workerSelected?.identification },
    });
    setIsLoading(false);
    dispatch({ type: SelectedActionType.SELECT, payload: null });
    onEnd();
  };

  const handleDisassociateFaceIds = async () => {
    if (!workerSelected?.identification) return;
    await disassociateImagesWorker({
      variables: {
        props: { identification: workerSelected?.identification, faceIds },
      },
    });
    onEndDisassociateImages();
  };

  return (
    <DialogActions>
      <LoadingButton
        variant="outlined"
        disabled={!faceIds.length}
        loading={loadingDeleteImages}
        onClick={handleDisassociateFaceIds}
      >
        Disassociate
      </LoadingButton>
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
