import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useGraphqlWorkerImages } from '../../hooks/useGraphqlWorkerImages';
import { useIdentificationState } from 'src/app/shared/provider/identification-provider';
import { ReactNode } from 'react';

export function FacesAssociatesWorker({
  children,
}: {
  children?: ReactNode;
}) {
  const { workerSelected } = useIdentificationState();
  const { resultGetWorkerImages } = useGraphqlWorkerImages(
    workerSelected?.identification
  );

  return (
    <ImageList
      sx={{
        width: 500,
        height: '100%',
        gridAutoColumns: 'min-content',
        gridAutoFlow: 'column',
      }}
      cols={4}
      rowHeight={164}
    >
      {children && <ImageListItem>{children}</ImageListItem>}
      {(resultGetWorkerImages.data?.getWorkerImages ?? []).map((item) => (
        <ImageListItem key={item.faceId}>
          <Box
            component="img"
            sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            loading="lazy"
            alt={item.faceId as string}
            src={`https://d2hskdss6gdvl2.cloudfront.net/${item.pathFaceInCollection}`}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
