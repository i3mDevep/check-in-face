import { useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Stack } from '@mui/material';
import { ModalWorkerSelected } from 'src/app/entities/shared/modal-worker-selected';
import { FacesAssociatesWorker } from 'src/app/entities/worker-images/components/faces-associates-worker';
import {
  ButtonActionImages,
  PreviewImage,
  UploadImages,
} from 'src/app/entities/worker-images/components/operations-over-images';
import { WorkerTable } from 'src/app/entities/worker/components/worker-table';
import { ModalCreateWorker } from 'src/app/entities/worker/components/create-worker';
import { IdentificationProvider } from 'src/app/shared/provider/identification-provider';
import { convertBase64ToFile } from 'src/app/utils/convert-base64-to-file';

export const WorkerMain = () => {
  const [prevImg, setPrevImg] = useState<string | null | undefined>(null);
  const [facesIds, setFacesId] = useState<string[]>([]);

  const clearPreview = () => setPrevImg(null);

  const imageFile = useMemo(
    () =>
      prevImg
        ? convertBase64ToFile(prevImg, uuidV4(), 'image/jpeg')
        : undefined,
    [prevImg]
  );

  return (
    <IdentificationProvider>
      <Stack gap={10} padding={10}>
        <ModalCreateWorker />
        <WorkerTable />
      </Stack>
      <ModalWorkerSelected
        title="Worker images"
        description="Here you can see and upload images to the worker"
        onCloseProp={clearPreview}
        otherComponent={
          <ButtonActionImages
            file={imageFile}
            onEnd={clearPreview}
            faceIds={facesIds}
            onEndDisassociateImages={() => setFacesId([])}
          />
        }
      >
        <PreviewImage prevImage={prevImg} onClose={clearPreview} />
        <FacesAssociatesWorker onChangeFacesIds={setFacesId}>
          <UploadImages onCaptureImageUrl={(img) => setPrevImg(img)} />
        </FacesAssociatesWorker>
      </ModalWorkerSelected>
    </IdentificationProvider>
  );
};
