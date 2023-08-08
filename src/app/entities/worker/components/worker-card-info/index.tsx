import { useEffect } from 'react';
import { CardInfoUser } from 'src/app/shared/components/card-info-user';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import { Typography } from '@mui/material';

const { VITE_CDN_IMAGES_WORKER } = import.meta.env;

export const WorkerCardInfo = ({
  identification,
}: {
  identification: string;
}) => {
  const {
    detailWorker: [getDetailWorker, result],
  } = useGraphqlWorker(true);
  useEffect(() => {
    getDetailWorker({ variables: { identification } });
  }, [getDetailWorker, identification]);

  if (!result.data?.getDetailWorker) return;
  const { fullName, profilePath } = result.data.getDetailWorker;
  return (
    <CardInfoUser
      src={profilePath ? `${VITE_CDN_IMAGES_WORKER}/${profilePath}` : undefined}
    >
      <Typography>{fullName}</Typography>
      <Typography variant='body2'>{identification}</Typography>
    </CardInfoUser>
  );
};
