import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TracerTimeWorkerTable } from 'src/app/entities/worker-timeline/components/tracer-time-worker-table';
import { IdentificationProvider } from 'src/app/shared/provider/identification-provider';

export const WorkerTracerTimeTableView = () => {
  const { identification } = useParams();

  if (!identification) return;
  return (
    <IdentificationProvider>
      <Stack gap={10} padding={10} height="100%">
        <TracerTimeWorkerTable identification={identification} />
      </Stack>
    </IdentificationProvider>
  );
};
