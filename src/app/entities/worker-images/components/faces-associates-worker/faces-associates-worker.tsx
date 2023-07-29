import { Box, Checkbox, ImageListItemBar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useGraphqlWorkerImages } from '../../hooks/useGraphqlWorkerImages';
import { useIdentificationState } from 'src/app/shared/provider/identification-provider';
import { ReactNode, useEffect, useState } from 'react';

export function FacesAssociatesWorker({ children, onChangeFacesIds }: { children?: ReactNode, onChangeFacesIds: (facesIds: string[]) => void }) {
  const [facesChecked, setFacesChecked] = useState<Record<string, boolean>>({});

  const { workerSelected } = useIdentificationState();
  const { resultGetWorkerImages } = useGraphqlWorkerImages(
    workerSelected?.identification
  );

  useEffect(() => {
    onChangeFacesIds(Object.keys(facesChecked))
  }, [facesChecked, onChangeFacesIds]) 

  const handleCheckFaces =
    (faceId: string | null) =>
    (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (!faceId) return;
      setFacesChecked((prev) => {
        const pass = { ...prev };
        if (checked) return { ...pass, [faceId]: true };
        delete pass?.[faceId];
        return pass;
      });
    };

  return (
    <ImageList
      sx={{
        width: 500,
      }}
      cols={4}
      rowHeight={164}
    >
      {children && <ImageListItem>{children}</ImageListItem>}
      {(resultGetWorkerImages.data?.getWorkerImages ?? []).map((item) => (
        <ImageListItem key={item.faceId}>
          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            position="top"
            actionIcon={
              <Checkbox
                sx={{ padding: 0, color: 'white' }}
                onChange={handleCheckFaces(item.faceId)}
                color="secondary"
                size="small"
              />
            }
            actionPosition="right"
          />
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
