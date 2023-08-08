import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Avatar, AvatarGroup } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useGraphqlWorkerImages } from 'src/app/entities/worker-images/hooks/useGraphqlWorkerImages';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';

const { VITE_CDN_IMAGES_WORKER } = import.meta.env;

interface AvatarProfileWorkerProps {
  src: string;
  identification: string;
}

export const AvatarProfileWorker = ({
  src,
  identification,
}: AvatarProfileWorkerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const {
    mutationCreateWorker: [updateWorker],
  } = useGraphqlWorker();

  const {
    lazyGetWorkerImages: [getWorkerImages, { data, loading }],
  } = useGraphqlWorkerImages();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    await getWorkerImages({ variables: { identification } });
  };

  const handleUpdateProfile = async (path: string) => {
    await updateWorker({ variables: { props: { identification, isPatch: true, profilePath: path }}})
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'update-profile' : undefined;

  return (
    <>
      <Avatar
        alt={src}
        src={src}
        onClick={handleClick}
        component="button"
        sx={{ border: 'none', padding: 0 }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <AvatarGroup total={data?.getWorkerImages.length}>
            {data?.getWorkerImages.map((image) => (
              <Avatar
                key={image.pathFaceInCollection}
                src={`${VITE_CDN_IMAGES_WORKER}/${image.pathFaceInCollection}`}
                component='div'
                sx={{ cursor: 'pointer' }}
                onClick={() => handleUpdateProfile(image.pathFaceInCollection as string)}
              />
            ))}
          </AvatarGroup>
        )}
      </Popover>
    </>
  );
};
