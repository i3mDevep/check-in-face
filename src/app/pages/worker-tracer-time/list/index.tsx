import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WorkerListSelected } from 'src/app/entities/worker/components/worker-list-selected';

export const WorkerTracerTime = () => {
  const navigate = useNavigate();
  return (
    <Stack height="100%">
      <WorkerListSelected onClickItem={(identification) => navigate(identification)} />
    </Stack>
  );
};
