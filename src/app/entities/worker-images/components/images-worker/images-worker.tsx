import { useIdentificationState } from 'src/app/shared/provider/identification-provider';
import { useGraphqlWorkerImages } from '../../hooks/useGraphqlWorkerImages';
import { AlertInfo } from 'src/app/shared/components/alert-info';
import { useMemo } from 'react';

export const ImagesWorker = () => {
  const { workerSelected } = useIdentificationState();
  const { resultGetWorkerImages } = useGraphqlWorkerImages(
    workerSelected?.identification
  );

  const hasImages = useMemo(
    () => resultGetWorkerImages.data?.getWorkerImages.length,
    [resultGetWorkerImages.data?.getWorkerImages.length]
  );

  return (
    <>
      <AlertInfo
        message={
          hasImages
            ? `This worker has ${resultGetWorkerImages.data?.getWorkerImages.length} images saved`
            : 'This worker has not images'
        }
      />
      {hasImages && (
        <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
          Images upload in collection
        </p>
      )}
      <div className="flex items-center gap-x-2">
        {resultGetWorkerImages.data?.getWorkerImages.map((workerImage) => (
          <img
            key={workerImage.pathFaceInCollection}
            className="object-cover object-center w-full h-48 mx-auto rounded-lg"
            src={`https://d2hskdss6gdvl2.cloudfront.net/${workerImage.pathFaceInCollection}`}
            alt={workerImage.pathFaceInCollection as string}
          />
        ))}
      </div>
    </>
  );
};
